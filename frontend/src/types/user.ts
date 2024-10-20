import { Role } from './role'

export interface User {
    guid: string;
    email: string;
    role: Role;
}
