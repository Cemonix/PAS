export interface Appointment {
    guid: string;
    date: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}