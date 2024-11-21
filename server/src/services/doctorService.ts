import {hashPassword} from "../utils/passwordUtils";
import prisma from "../prisma/client";
import {UserRole} from "../types/enums/roles";
import {RegisterDoctorRequestDto, RegisterDoctorResponseDto} from "../types/dtos/auth/RegisterDto";
import jwt from "jsonwebtoken";

export class DoctorService {
    async registerDoctor(data: RegisterDoctorRequestDto): Promise<RegisterDoctorResponseDto> {
        const passwordHash = await hashPassword(data.password);

        const { user, doctor, specialization } = await prisma.$transaction(async (tx) => {
            const existingUser = await tx.user.findUnique({
                where: { email: data.email }
            });

            if (existingUser) {
                throw new Error("User already exists");
            }

            const specialization = await tx.specialization.upsert({
                where: { name: data.specialization },
                update: {},
                create: { name: data.specialization }
            });

            const user = await tx.user.create({
                data: {
                    email: data.email,
                    passwordHash,
                    role: UserRole.DOCTOR,
                }
            });

            const doctor = await tx.doctor.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    contactEmail: data.contactEmail,
                    location: data.location,
                    phoneNumber: data.phoneNumber,
                    userGuid: user.guid,
                    specializationGuid: specialization.guid,
                },
                include: {
                    user: true,
                    specialization: true
                }
            });

            return { user, doctor, specialization };
        }, {
            maxWait: 5000,
            timeout: 10000
        });

        const token = jwt.sign(
            {
                guid: user.guid,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return {
            token,
            doctor: {
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                contactEmail: doctor.contactEmail,
                location: doctor.location,
                phoneNumber: doctor.phoneNumber,
                specialization: specialization.name,
            }
        };
    }
}