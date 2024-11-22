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

export interface RegisterPatientRequestDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    street: string;
    city: string;
    postalCode: string;
}

export interface RegisterPatientResponseDto {
    token: string;
    patient: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        dateOfBirth: Date;
        street: string;
        city: string;
        postalCode: string;
    }
}