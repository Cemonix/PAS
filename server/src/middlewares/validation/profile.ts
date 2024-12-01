import { body } from "express-validator";

export const updatePasswordValidation = [
    body("currentPassword")
        .isString()
        .notEmpty()
        .withMessage("Current password is required"),
    body("newPassword")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number"),
];
