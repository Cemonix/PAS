import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { UserRole } from "../../types/enums/roles";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No token provided" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET!) as {
            guid: string;
            email: string;
            role: UserRole;
        };
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Token expired',
                code: 'TOKEN_EXPIRED'
            });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};
