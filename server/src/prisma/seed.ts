import dotenv from 'dotenv';
import crypto from 'crypto';

import prisma from './client'
import { hashPassword } from '../utils/passwordUtils';
import {Role} from "@prisma/client";

dotenv.config();

async function seed() {
    const existingAdmin = await prisma.user.findFirst({
        where: { role: Role.ADMIN }
    });
    
    if (!existingAdmin) {
        const adminEmail = "admin@admin.com";
        const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD || "defaultAdminPassword");

        await prisma.user.create({
            data: {
                guid: crypto.randomUUID(),
                email: adminEmail,
                passwordHash: hashedPassword,
                role: Role.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
                failedLoginAttempts: 0,
            },
        });
        console.log(`Admin created with email: ${adminEmail}`);
    } else {
        console.log(`Admin already exists.`);
    }
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
