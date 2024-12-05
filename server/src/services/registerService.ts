import {hashPassword} from "../utils/passwordUtils";
import prisma from "../prisma/client";
import { Role } from "@prisma/client";
import {
    RegisterDoctorRequestDto,
    RegisterDoctorResponseDto,
    RegisterPatientRequestDto,
    RegisterPatientResponseDto
} from "../types/dtos/auth/RegisterDto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const isEmailUnique = async(email: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    return !existingUser;
}

const generateToken = (guid: string, email: string, role: Role) => {
    return jwt.sign(
        { guid, email, role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );
}

export const registerDoctorService = async (data: RegisterDoctorRequestDto): Promise<RegisterDoctorResponseDto> => {
    const { user, doctor, specialization } = await prisma.$transaction(async (tx) => {
        if (!await isEmailUnique(data.email)) {
            throw new Error("User already exists");
        }

        const specialization = await prisma.specialization.upsert({
            where: { name: data.specialization },
            update: {},
            create: { name: data.specialization }
        });

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await tx.user.create({
            data: {
                email: data.email,
                passwordHash: hashedPassword,
                role: Role.DOCTOR,
            },
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

    const token = generateToken(user.guid, user.email, user.role);

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

export const registerPatientService = async (data: RegisterPatientRequestDto): Promise<RegisterPatientResponseDto> => {
    const { user, patient } = await prisma.$transaction(async (tx) => {
        if (!await isEmailUnique(data.email)) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await tx.user.create({
            data: {
                email: data.email,
                passwordHash: hashedPassword,
                role: Role.PATIENT,
            },
        });


        const patient = await tx.patient.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                dateOfBirth: new Date(data.dateOfBirth).toISOString(),
                street: data.street,
                city: data.city,
                postalCode: data.postalCode,
                userGuid: user.guid,
            },
            include: {
                user: true,
            }
        });

        return { user, patient };
    }, {
        maxWait: 5000,
        timeout: 10000
    });

    const token = generateToken(user.guid, user.email, user.role);

    return {
        token,
        patient: {
            firstName: patient.firstName,
            lastName: patient.lastName,
            phoneNumber: patient.phoneNumber,
            dateOfBirth: patient.dateOfBirth,
            street: patient.street,
            city: patient.city,
            postalCode: patient.postalCode
        }
    };
}