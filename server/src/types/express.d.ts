import { UserRole } from "./enums/roles";

declare global {
    namespace Express {
        interface User {
            guid: string;
            email: string;
            role: UserRole;
        }

        interface Request {
            user?: User;
        }
    }
}
