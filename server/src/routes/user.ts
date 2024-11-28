import express from "express";

import { authenticate } from "../middlewares/auth/authenticate";
import {deleteAccount, getUserProfile, updatePassword} from "../controllers/user/user";
import { updatePasswordValidation } from "../middlewares/validation/user";
import {handleValidationErrors} from "../middlewares/validation/validationBase";


const router = express.Router();

router.use(handleValidationErrors, authenticate);

router.patch('/profile/', authenticate, getUserProfile);
router.patch('/password', updatePasswordValidation, updatePassword);
router.delete('/account', deleteAccount);

export default router;
