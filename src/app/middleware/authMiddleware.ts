import { Request, Response, NextFunction } from "express";
import { Payload, verifyToken } from "../auth/services/jwt.service";

export interface AuthenticatedRequest extends Request {
    user?: Payload;
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            status: "error",
            message: "Authorization token missing or invalid format",
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    if (!decoded) {
        res.status(401).json({
            status: "error",
            message: "Invalid or expired token",
        });
        return;
    }

    req.user = decoded;
    next();
};
