import { Router } from 'express';
import {getAvailability, createAppointment, getAppointments} from '../controllers/appointment';
import {authenticate} from "../middlewares/auth/authenticate";

const router = Router();

router.get('/', authenticate, getAppointments);
router.get('/availability/:doctorId', authenticate, getAvailability);
router.post('/create', authenticate, createAppointment);

export default router;