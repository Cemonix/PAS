import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {DoctorService} from "../../services/doctorService";

export const registerDoctor = async (req: Request, res: Response) => {
    const doctorService = new DoctorService();

    try {
        const result = await doctorService.registerDoctor(req.body);

        const token = jwt.sign(
            {
                guid: result.user.guid,
                email: result.user.email,
                role: result.user.role,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            token,
            doctor: {
                firstName: result.doctor.firstName,
                lastName: result.doctor.lastName,
                contactEmail: result.doctor.contactEmail,
                location: result.doctor.location,
                phoneNumber: result.doctor.phoneNumber,
                specialization: result.specialization.name,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            switch (error.message) {
                case "User already exists":
                    return res.status(409).json({ message: error.message });
                case "Specialization doesn't exist":
                    return res.status(400).json({ message: error.message });
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
