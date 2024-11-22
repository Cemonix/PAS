import { Request, Response } from "express";
import {registerDoctorService, registerPatientService} from "../../services/registerService";

export const registerDoctor = async (req: Request, res: Response) => {
    try {
        const result = await registerDoctorService(req.body);
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

export const registerPatient = async (req: Request, res: Response) => {

    try {
        const result = await registerPatientService(req.body);
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
}