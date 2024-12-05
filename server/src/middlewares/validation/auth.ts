import { body } from "express-validator";

export const loginValidation = [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number"),
];

export const doctorRegistrationValidation = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("specialization").notEmpty().withMessage("Specialization is required"),
];

export const patientRegistrationValidation = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("dateOfBirth").custom(
        (value) => {
            try {
                new Date(value).toISOString();
                return true;
            } catch {
                throw new Error("Invalid date format. Use YYYY-MM-DD");
            }
    }),
    body("phoneNumber")
        .isMobilePhone('cs-CZ')
        .withMessage("Valid phone number is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("street").notEmpty().withMessage("Street is required"),
    body("postalCode").notEmpty().withMessage("Postal code is required"),
];
