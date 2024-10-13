import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const userValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').isString().withMessage('First name is required'),
    body('surname').isString().withMessage('Surname is required'),
    body('street').isString().withMessage('Street is required'),
    body('city').isString().withMessage('City is required'),
    body('postalCode').isString().withMessage('Postal code is required'),
    body('role').isIn(['PATIENT', 'DOCTOR', 'ADMIN']).withMessage('Invalid role provided')
]

export const loginValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]