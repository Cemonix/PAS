import { Request, Response } from 'express';
import { getDoctorPatientsService, getDoctorAppointmentsService } from '../services/doctor';

export const getPatients = async (req: Request, res: Response) => {
    const doctorId = parseInt(req.params.id);

    try {
        const patients = await getDoctorPatientsService(doctorId);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error });
    }
};

export const getDoctorAppointments = async (req: Request, res: Response) => {
    const doctorId = parseInt(req.params.id);
    const { date } = req.query;
    
    if (!date) {
        return res.status(400).json({ message: 'Date query parameter is required' });
    }
    
    try {
        const appointments = await getDoctorAppointmentsService(doctorId, date as string);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};
