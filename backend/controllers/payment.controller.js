export const createCheckoutSession = async (req, res) => {
    async (req, res) => {
        try {
            const { products, couponCode } = req.body;

            // Validating if the products array is valid and not empty
            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ message: "Invalid products" });
            }

            let totalAmount = 0;

            // Mapping products to Stripe line items
            const lineItems = products.map((product) => {
                const amount = Math.round(product.price * 100);
                totalAmount += amount * product.quantity;

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            images: [product.image],
                        },
                        unit_amount: amount,
                    },
                };
            });

            let coupon = null;
            // If couponCode is provided, validate and apply the discount
            if (couponCode) {
                coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
                if (coupon) {
                    // Apply the discount if a valid coupon is found
                    totalAmount -= Math.round(totalAmount * coupon.discount / 100);
                }
            }

            // Create a Stripe checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
                discounts: coupon ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }] : [],
                metaData: {
                    userId: req.user._id.toString(),
                    couponCode: couponCode || "",
                },
            });

            // If the total amount is more than or equal to $200, create a new coupon for the user
            if (totalAmount >= 20000) {
                await createNewCoupon(req.user._id);
            }

            // Respond with the session ID and the total amount (in dollars)
            res.status(200).json({ sessionId: session.id, totalAmount: totalAmount / 100 });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating checkout session", error: error.message });
        }
    };
}

async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    });

    return coupon.id;
}

// Helper function to create a new coupon for a user if they reach the $200 threshold
async function createNewCoupon(userId) {
    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discount: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: userId,
        isActive: true,
    });

    await newCoupon.save();
}

