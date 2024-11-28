import { Request, Response, NextFunction } from 'express';

import {Role} from "@prisma/client";

export const checkRole = (requiredRole: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (user.role !== Role.ADMIN && user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
        }

        next();
    };
};