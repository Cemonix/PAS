import express from "express";

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
import {Role} from "@prisma/client";

const router = express.Router();

router.use(handleValidationErrors);

router.post("/login", loginValidation, login);
router.post(
    "/register/doctor",
    authenticate,
    checkRole(Role.ADMIN),
    doctorRegistrationValidation,
    registerDoctor
);
router.post(
    "/register/patient",
    authenticate,
    checkRole(Role.DOCTOR),
    patientRegistrationValidation,
    registerPatient
);

export default router;
