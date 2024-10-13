import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth';
import { handleValidationErrors, loginValidation, userValidation } from '../middlewares/validation';

const router = Router();

// Registration route
router.post(
    '/register',
    userValidation,
    handleValidationErrors,
    registerUser
);

// Login route
router.post(
    '/login',
    loginValidation,
    handleValidationErrors,
    loginUser
);

export default router;
