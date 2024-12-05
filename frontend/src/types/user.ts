import { Role } from './role'

export interface User {
    guid: string;
    email: string;
    role: Role;
}

export interface Doctor {
    guid: string;
    firstName: string;
    lastName: string;
}