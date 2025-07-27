import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
        
    } catch (err) {
        res.json({success: false, message: "Invalid token"});
    }
}