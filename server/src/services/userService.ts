import prisma from "../prisma/client";
import { Role } from "@prisma/client";
import {comparePasswords, hashPassword} from "../utils/passwordUtils";
import { DoctorProfileDto, PatientProfileDto } from "../types/dtos/user/ProfileDto";
import { UpdatePasswordDto } from "../types/dtos/user/UpdatePasswordDto";

export const getUserProfileService = async (userGuid: string): Promise<DoctorProfileDto | PatientProfileDto> => {
    const user = await prisma.user.findUnique({
        where: { guid: userGuid },
        include: {
            doctor: {
                include: {
                    specialization: true
                }
            },
            patient: true
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role === Role.DOCTOR && user.doctor) {
        return {
            email: user.email,
            role: user.role,
            firstName: user.doctor.firstName,
            lastName: user.doctor.lastName,
            contactEmail: user.doctor.contactEmail,
            location: user.doctor.location,
            phoneNumber: user.doctor.phoneNumber,
            specialization: user.doctor.specialization.name
        };
    } else if (user.role === Role.PATIENT && user.patient) {
        return {
            email: user.email,
            role: user.role,
            firstName: user.patient.firstName,
            lastName: user.patient.lastName,
            phoneNumber: user.patient.phoneNumber,
            dateOfBirth: user.patient.dateOfBirth,
            street: user.patient.street,
            city: user.patient.city,
            postalCode: user.patient.postalCode
        };
    }

    throw new Error("Invalid user role or missing profile data");
};

export const updatePasswordService = async (userGuid: string, data: UpdatePasswordDto) => {
    const user = await prisma.user.findUnique({
        where: { guid: userGuid },
        select: { passwordHash: true }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await comparePasswords(data.currentPassword, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error("Current password is incorrect");
    }

    if (data.newPassword !== data.confirmPassword) {
        throw new Error("New password and confirmation do not match");
    }

    const newPasswordHash = await hashPassword(data.newPassword);
    await prisma.user.update({
        where: { guid: userGuid },
        data: { passwordHash: newPasswordHash }
    });
};

export const deleteAccountService = async (userGuid: string) => {
    const user = await prisma.user.findUnique({
        where: { guid: userGuid },
        include: {
            doctor: true,
            patient: true
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    await prisma.$transaction(async () => {
        // Delete associated profile first (doctor or patient)
        if (user.role === Role.DOCTOR && user.doctor) {
            await prisma.doctor.delete({
                where: { guid: user.doctor.guid }
            });
        } else if (user.role === Role.PATIENT && user.patient) {
            await prisma.patient.delete({
                where: { guid: user.patient.guid }
            });
        }

        await prisma.user.delete({
            where: { guid: userGuid }
        });
    });
};