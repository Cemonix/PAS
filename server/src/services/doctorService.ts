import prisma from "../prisma/client";

export const getDoctorsService = async () => {
    return prisma.doctor.findMany({
        select: {
            guid: true,
            firstName: true,
            lastName: true,
            specialization: {
                select: {
                    name: true
                }
            },
            user: {
                select: {
                    guid: true
                }
            }
        }
    });
}