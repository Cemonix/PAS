import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { UserRole } from "../../types/roles";

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
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            guid: string;
            email: string;
            role: UserRole;
        };

        req.user = {
            guid: decoded.guid,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};
