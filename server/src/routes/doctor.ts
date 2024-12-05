import { Router } from 'express';
import { getDoctors } from '../controllers/doctor';
import {authenticate} from "../middlewares/auth/authenticate";

const router = Router();

router.get('/', authenticate, getDoctors);

export default router;