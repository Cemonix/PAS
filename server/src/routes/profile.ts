import express from "express";

import { authenticate } from "../middlewares/auth/authenticate";
import { deleteAccount, getUserProfile, updatePassword } from "../controllers/profile/profile";
import { updatePasswordValidation } from "../middlewares/validation/profile";
import { handleValidationErrors } from "../middlewares/validation/validationBase";


const router = express.Router();

router.use(handleValidationErrors, authenticate);

router.get('/get-profile', getUserProfile);
router.put('/update-password', updatePasswordValidation, updatePassword);
router.delete('/delete-account', deleteAccount);

export default router;
