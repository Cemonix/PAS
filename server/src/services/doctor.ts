import prisma from '../prisma/client';

export const getDoctorPatientsService = async (doctorId: number) => {
    return prisma.user.findMany({
        where: {
            Appointment: {
                some: {
                    doctorId: doctorId,
                }
            }
        },
        select: {
            id: true,
            firstName: true,
            surname: true,
            email: true
        }
    });
};

export const getDoctorAppointmentsService = async (doctorId: number, date: string) => {
    return prisma.appointment.findMany({
        where: {
            doctorId: doctorId,
            appointmentTime: {
                gte: new Date(`${date}T00:00:00.000Z`),
                lt: new Date(`${date}T23:59:59.999Z`)
            }
        },
        select: {
            id: true,
            appointmentTime: true,
            note: true,
            patient: {
                select: {
                    firstName: true,
                    surname: true
                }
            }
        }
    });
};
