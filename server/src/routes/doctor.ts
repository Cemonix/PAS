import { Router } from 'express';
import { getPatients, getDoctorAppointments } from '../controllers/doctor';
import { validateId } from '../middlewares/validation';

const router = Router();

// Route to get patients for a specific doctor with ID validation middleware
router.get('/:id/patients', validateId, getPatients);

// Route to get appointments for a specific doctor with ID validation middleware
router.get('/:id/appointments', validateId, getDoctorAppointments);

export default router;
