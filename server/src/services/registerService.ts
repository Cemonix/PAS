import {hashPassword} from "../utils/passwordUtils";
import prisma from "../prisma/client";
import {UserRole} from "../types/enums/roles";
import {
    RegisterDoctorRequestDto,
    RegisterDoctorResponseDto,
    RegisterPatientRequestDto,
    RegisterPatientResponseDto
} from "../types/dtos/auth/RegisterDto";
import jwt from "jsonwebtoken";

export const registerDoctorService = async (data: RegisterDoctorRequestDto): Promise<RegisterDoctorResponseDto> => {
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

export const registerPatientService = async (data: RegisterPatientRequestDto): Promise<RegisterPatientResponseDto> => {
    const passwordHash = await hashPassword(data.password);

    const { user, patient } = await prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const user = await tx.user.create({
            data: {
                email: data.email,
                passwordHash,
                role: UserRole.DOCTOR,
            }
        });

        const patient = await tx.patient.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                dateOfBirth: data.dateOfBirth,
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