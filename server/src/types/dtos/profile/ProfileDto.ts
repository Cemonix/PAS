import { Role } from "@prisma/client";

export interface BaseProfileDto {
    email: string;
    role: Role;
}

export interface DoctorProfileDto extends BaseProfileDto {
    firstName: string;
    lastName: string;
    contactEmail: string;
    location: string;
    phoneNumber: string;
    specialization: string;
}

export interface PatientProfileDto extends BaseProfileDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: Date;
    street: string;
    city: string;
    postalCode: string;
}