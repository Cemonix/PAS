<template>
    <div class="appointment-bar">
        <button class="btn" @click="previousMonth">Previous</button>
        <h1 class="appointment-title">Patient Appointment System</h1>
        <button class="btn" @click="nextMonth">Next</button>
        <h2 class="appointment-month">{{ currentMonthDisplay }}</h2>
    </div>
    <div class="appointment-grid">
        <DayCell
            v-for="date in calendarDays"
            :key="date.toISOString()"
            :date="date"
            :is-current-month="isCurrentMonth(date)"
            :appointments="appointments"
            @appointmentCreated="fetchAppointments"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, watch, onMounted } from 'vue';
    import apiClient from "../services/api";
    import DayCell from "../components/DayCell.vue";
    import {Appointment} from "../types/appointment.ts";


    const currentDate = ref(new Date());
    const appointments = ref<Appointment[]>([]);

    // Get first day of current month
    const firstDayOfMonth = computed(() => {
        const date = new Date(currentDate.value);
        date.setDate(1);
        return date;
    });

    // Get the days to show in calendar
    const calendarDays = computed(() => {
        const days: Date[] = [];
        const firstDay = new Date(firstDayOfMonth.value);

        // Go to the first Sunday before the month starts
        firstDay.setDate(firstDay.getDate() - firstDay.getDay());

        // Generate 6 weeks of dates
        for (let i = 0; i < 42; i++) {
            days.push(new Date(firstDay));
            firstDay.setDate(firstDay.getDate() + 1);
        }

        return days;
    });

    const isCurrentMonth = (date: Date) => {
        return date.getMonth() === currentDate.value.getMonth();
    };

    const previousMonth = () => {
        const newDate = new Date(currentDate.value);
        newDate.setMonth(newDate.getMonth() - 1);
        currentDate.value = newDate;
    }

    const nextMonth = () => {
        const newDate = new Date(currentDate.value);
        newDate.setMonth(newDate.getMonth() + 1);
        currentDate.value = newDate;
    }

    const currentMonthDisplay = computed(() => {
        return currentDate.value.toLocaleString('en-us', {
            month: 'long',
            year: 'numeric'
        });
    });

    const fetchAppointments = async () => {
        try {
            const firstDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1);
            const lastDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0);
            lastDay.setHours(23, 59, 59, 999);

            const response = await apiClient.get('/appointments', {
                params: {
                    startDate: firstDay.toISOString(),
                    endDate: lastDay.toISOString()
                }
            });
            appointments.value = response.data;
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    watch(() => currentDate.value, () => {
        fetchAppointments();
    });

    onMounted(() => {
        fetchAppointments();
    })
</script>

<style scoped>
    .appointment-bar {
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
        grid-template-rows: 1fr 1fr;
        margin: 10px 0;
    }

    .appointment-grid {
        display: grid;
        flex-grow: 1;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);
    }

    .appointment-bar .btn {
        min-width: 100px;
        padding: 5px 0;
        margin: 0 10px;
        background: #cecece;
        border: none;
        outline: none;
        border-radius: 40px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
    }

    .appointment-title {
        text-align: center;
        grid-column: 2;
        grid-row: 1;
    }

    .appointment-month {
        text-align: center;
        grid-column: 1 / -1;
        grid-row: 2;
        margin-top: 5px;
    }
</style>