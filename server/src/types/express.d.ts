import {Role} from "@prisma/client";

declare global {
    namespace Express {
        interface User {
            guid: string;
            email: string;
            role: Role;
        }

        interface Request {
            user?: User;
        }
    }
}
