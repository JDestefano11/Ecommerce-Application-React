import { redis } from "../lib/redis.js"
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Generate Tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
}

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
}

// Set Cookies
const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

// Signup
export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    const userExists = await User.findOne({ email });

    try {
        if (userExists) {
            return res.status(400).json({ message: "User  already exists" });
        }

        const user = await User.create({ name, email, password });

        // Authenticate User 
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            message: "User  created successfully"
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if the user exists and if the password is correct
        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);

            // Respond with user details and a success message
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: "Login successful"
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
}

// Logout
export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
}

// Refresh Access Token After Expires
export const refreshToken = async (req, res) => {
    // Extract the refresh token from cookies
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Decode and retrieve the token from redis
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

        if (storedToken !== refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Create a new access token
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        // Store the new access token in redis
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });
        res.json({ message: "Access token refreshed", accessToken: accessToken });
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}


// export const getProfile = async (req, res) => {

// }