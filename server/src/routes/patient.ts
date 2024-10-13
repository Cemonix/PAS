import { Router } from 'express';
import { getPatients, getDoctorAppointments } from '../controllers/doctor';
import { validateId } from '../middlewares/validation';

const router = Router();

// Route to get patients for a specific doctor with ID validation middleware
// router.get('/:id/appointments', validateId, getPatients);

// Route to get appointments for a specific doctor with ID validation middleware
// router.post('/appointments', validateId, createAppointment);

export default router;
