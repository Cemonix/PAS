import { Request, Response, NextFunction } from 'express';

import { UserRole } from 'types/roles';

export const checkRole = (requiredRole: UserRole) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
        }

        next();
    };
};