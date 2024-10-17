import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import prisma from "prisma/client";
import { hashPassword } from "utils/passwordUtils";
import { UserRole } from "types/roles";

export const registerDoctor = async (req: Request, res: Response) => {
    const {
        email,
        password,
        firstName,
        lastName,
        contactEmail,
        location,
        phoneNumber,
        specializationName,
    } = req.body;

    try {
        const passwordHash = await hashPassword(password);

        const result = await prisma.$transaction(async (prisma) => {
            const specialization = await prisma.specialization.findUnique({
                where: { name: specializationName },
            });

            if (!specialization) {
                throw new Error("Specialization doesn't exist");
            }

            const user = await prisma.user.create({
                data: {
                    email: email,
                    passwordHash: passwordHash,
                    role: UserRole.DOCTOR,
                },
            });

            const doctor = await prisma.doctor.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    contactEmail: contactEmail,
                    location: location,
                    phoneNumber: phoneNumber,
                    userGuid: user.guid,
                    specializationGuid: specialization.guid,
                },
            });

            return { user, doctor, specialization };
        });

        const token = jwt.sign(
            {
                guid: result.user.guid,
                email: result.user.email,
                role: result.user.role,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
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
        console.error(error);
        return res.status(500).json({ message: "Registration error" });
    }
};

export const registerPatient = () => {}
