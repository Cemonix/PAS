import {Role} from "@prisma/client";

export interface JwtPayload {
    guid: string;
    email: string;
    role: Role;
}