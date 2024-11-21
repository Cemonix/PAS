import { Request, Response } from "express";
import {DoctorService} from "../../services/doctorService";

export const registerDoctor = async (req: Request, res: Response) => {
    const doctorService = new DoctorService();

    try {
        const result = await doctorService.registerDoctor(req.body);
        return res.status(201).json(result);
    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case "User already exists":
                    return res.status(409).json({ message: error.message });
                default:
                    console.error("Registration error:", error);
                    return res.status(500).json({ message: "Internal server error" });
            }
        }

        console.error("Unexpected error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const registerPatient = () => {}
