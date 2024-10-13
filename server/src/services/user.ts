import { User } from '@prisma/client';
import prisma from '../prisma/client';

export const createUserService = async (user: User): Promise<UserDTO> => {
    
};

const findOrCreateAddress = async (address: { street: string; city: string; postalCode: string }) => {
    let cityRecord = await prisma.city.findUnique({ where: { name: address.city } });
    if (!cityRecord) {
        cityRecord = await prisma.city.create({ data: { name: address.city } });
    }

    let postalCodeRecord = await prisma.postalCode.findUnique({ where: { code: address.postalCode } });
    if (!postalCodeRecord) {
        postalCodeRecord = await prisma.postalCode.create({ data: { code: address.postalCode } });
    }

    return prisma.address.create({
        data: {
            street: address.street,
            cityId: cityRecord.id,
            postalCodeId: postalCodeRecord.id,
        },
    });
};


// Find a user by email
export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

// Find user by ID
export const findUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

// Delete user by ID
export const deleteUserService = async (id: number) => {
    return prisma.user.delete({
        where: { id },
    });
};

