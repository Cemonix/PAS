import { CreateAppointmentDto } from "../types/dtos/appointment";
import prisma from "../prisma/client";

export const getAvailabilityService = async (data: CreateAppointmentDto) => {
    const startOfDay = new Date(data.date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(data.date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await prisma.appointment.findMany({
        where: {
            doctorId: data.doctorId,
            date: {
                gte: startOfDay,
                lt: endOfDay
            }
        }
    });

    // Generate time slots (8 AM to 5 PM)
    const slots = [];
    const startTime = new Date(data.date);
    startTime.setHours(8, 0, 0, 0);

    for (let i = 0; i < 9; i++) {
        const slotTime = new Date(startTime.getTime() + i * 60 * 60000);
        const isBooked = existingAppointments.some(apt =>
            apt.date.getTime() === slotTime.getTime()
        );

        if (!isBooked) {
            slots.push({
                time: slotTime.toISOString(),
                available: true
            });
        }
    }

    return slots;
}

export const getAppointmentsService = async (userId: string, startDate: string, endDate: string) => {
    const user = await prisma.user.findUnique({
        where: { guid: userId },
        include: {
            patient: true,
            doctor: true
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    const searchId = user.role === 'PATIENT' ? user.patient?.guid : user.doctor?.guid;
    if (!searchId) throw new Error('Record not found');

    return prisma.appointment.findMany({
        where: {
            date: {
                gte: new Date(startDate),
                lte: new Date(endDate)
            },
            ...(user.role === 'PATIENT' ? { patientId: searchId } : { doctorId: searchId })
        },
        orderBy: {
            date: 'asc'
        }
    });
};

const checkAppointmentAvailability = async (doctorId: string, date: Date) => {
    const existingAppointment = await prisma.appointment.findFirst({
        where: {
            doctorId,
            date: {
                equals: date
            },
            status: {
                not: 'CANCELLED'
            }
        }
    });

    if (existingAppointment) {
        throw new Error('This time slot is already booked');
    }
};

export const createAppointmentService = async (data: CreateAppointmentDto) => {
    await checkAppointmentAvailability(data.doctorId, new Date(data.date));

    const patient = await prisma.patient.findFirst({
        where: {
            userGuid: data.patientId
        }
    });

    if (!patient) {
        throw new Error('Patient record not found');
    }

    return prisma.appointment.create({
        data: {
            patientId: patient.guid,
            doctorId: data.doctorId,
            date: new Date(data.date),
            status: 'SCHEDULED'
        }
    });
}
