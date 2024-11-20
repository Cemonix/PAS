import {hashPassword} from "../utils/passwordUtils";
import prisma from "../prisma/client";
import {UserRole} from "../types/roles";

interface DoctorRegistrationData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    contactEmail: string;
    location: string;
    phoneNumber: string;
    specializationName: string;
}

export class DoctorService {
    async registerDoctor(data: DoctorRegistrationData) {
        const passwordHash = await hashPassword(data.password);

        return prisma.$transaction(async (tx) => {
            const existingUser = await tx.user.findUnique({
                where: { email: data.email }
            });

            if (existingUser) {
                throw new Error("User already exists");
            }

            const specialization = await tx.specialization.findUnique({
                where: { name: data.specializationName },
            });

            if (!specialization) {
                throw new Error("Specialization doesn't exist");
            }

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
    }
}