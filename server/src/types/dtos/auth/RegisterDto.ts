export interface RegisterDoctorRequestDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    contactEmail: string;
    location: string;
    phoneNumber: string;
    specialization: string;
}

export interface RegisterDoctorResponseDto {
    token: string;
    doctor: {
        firstName: string;
        lastName: string;
        contactEmail: string;
        location: string;
        phoneNumber: string;
        specialization: string;
    }
}

export interface RegisterPatientDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
}