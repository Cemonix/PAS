import express from "express";

import { UserRole } from "../types/roles";
import { checkRole } from "../middlewares/auth/checkRole";
import { authenticate } from "../middlewares/auth/authenticate";
import { handleValidationErrors } from "../middlewares/validation/validationBase";
import {
    loginValidation,
    doctorRegistrationValidation,
    patientRegistrationValidation,
} from "../middlewares/validation/auth";
import {
    login,
    logout,
    registration,
} from "../controllers/auth";

const router = express.Router();

router.post("/login", loginValidation, handleValidationErrors, login);
router.post("/logout", authenticate, logout);
router.post(
    "/register/doctor",
    authenticate,
    checkRole(UserRole.ADMIN),
    doctorRegistrationValidation,
    handleValidationErrors,
    registration
);
router.post(
    "/register/patient",
    authenticate,
    checkRole(UserRole.DOCTOR),
    patientRegistrationValidation,
    handleValidationErrors,
    registration
);

export default router;
