import { Request, Response } from 'express';
import { getDoctorsService } from '../services/doctorService';

export const getDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await getDoctorsService();
        return res.json(doctors);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch doctors' });
    }
}