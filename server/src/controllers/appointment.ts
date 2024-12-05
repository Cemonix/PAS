import { Request, Response } from 'express';
import {
    getAvailabilityService,
    createAppointmentService,
    getAppointmentsService
} from '../services/appointmentService';
import {CreateAppointmentDto} from "../types/dtos/appointment";

export const getAvailability = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params;
        const { date } = req.query;
        const slots = await getAvailabilityService(
            { doctorId: doctorId, patientId: "", date: date as string} as CreateAppointmentDto
        );
        return res.json(slots);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch availability' });
    }
}

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.user?.guid;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required' });
        }

        const appointments = await getAppointmentsService(
            userId!,
            startDate as string,
            endDate as string
        );

        return res.json(appointments);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { doctorId, date } = req.body;
        const patientId = req.user?.guid;

        if (!patientId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const appointment = await createAppointmentService({
            patientId,
            doctorId,
            date
        });

        return res.status(201).json(appointment);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create appointment' });
    }

}