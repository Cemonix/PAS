import express from "express";

import { UserRole } from "../types/enums/roles";
import { checkRole } from "../middlewares/auth/checkRole";
import { authenticate } from "../middlewares/auth/authenticate";
import { handleValidationErrors } from "../middlewares/validation/validationBase";
import {
    loginValidation,
    doctorRegistrationValidation,
    patientRegistrationValidation,
} from "../middlewares/validation/auth";
import { registerDoctor, registerPatient } from "../controllers/auth/registration"
import { login } from "../controllers/auth/login"
import { logout } from "../controllers/auth/logout"

const router = express.Router();

router.post("/login", loginValidation, handleValidationErrors, login);
router.post("/logout", authenticate, logout);
router.post(
    "/register/doctor",
    authenticate,
    checkRole(UserRole.ADMIN),
    doctorRegistrationValidation,
    handleValidationErrors,
    registerDoctor
);
router.post(
    "/register/patient",
    authenticate,
    checkRole(UserRole.DOCTOR),
    patientRegistrationValidation,
    handleValidationErrors,
    registerPatient
);

export default router;
