import { body } from "express-validator";

export const loginValidation = [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const doctorRegistrationValidation = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("specialization").notEmpty().withMessage("Specialization is required"),
];

export const patientRegistrationValidation = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("birthdate").isDate().withMessage("Valid birthdate is required"),
    body("phoneNumber")
        .isMobilePhone('cs-CZ')
        .withMessage("Valid phone number is required"),
];
