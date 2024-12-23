import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    }

    catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

export const adminRoute = async (req, res, next) => {
    try {
        if (req.user && req.user.role !== "admin") {
            return res.status(401).json({ message: "Admin Only" });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}