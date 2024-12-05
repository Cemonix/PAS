<template>
    <DialogRoot>
        <DialogTrigger asChild>
            <div class="cell-container"
                 :class="{ 'current-month': isCurrentMonth }"
                 :style="{ cursor: isCurrentMonth ? 'pointer' : 'default' }">
                <p class="title-day">{{ formattedDate }}</p>
                <div class="appointment-container">
                    <div v-for="appointment in dayAppointments"
                         :key="appointment.guid"
                         class="appointment"
                         :class="appointment.status.toLowerCase()">
                        {{ formatTime(appointment.date) }}
                    </div>
                </div>
            </div>
        </DialogTrigger>
        <AppointmentForm :selected-date="date"
                         @appointmentCreated="$emit('appointmentCreated')"
        />
    </DialogRoot>
</template>

<script setup lang="ts">
    import { computed } from "vue";
    import { DialogRoot, DialogTrigger } from 'radix-vue';
    import AppointmentForm from './forms/AppointmentForm.vue';
    import {Appointment} from "../types/appointment.ts";

    const props = defineProps<{
        date: Date;
        isCurrentMonth: boolean;
        appointments?: Appointment[];
    }>();

    const formattedDate = computed(() => {
        return props.date.getDate();
    });

    const dayAppointments = computed(() => {
        if (!props.appointments) return [];
        return props.appointments.filter(apt =>
            new Date(apt.date).toDateString() === props.date.toDateString()
        );
    });

    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
</script>

<style scoped>
    .cell-container {
        display: flex;
        flex-direction: column;
        aspect-ratio: 1;
        border: 1px solid #e0e0e0;
        padding: 8px;
        background-color: #fff;
        cursor: pointer;
    }

    .cell-container.current-month {
        background-color: #fff;
    }

    .cell-container:hover {
        background-color: #f5f5f5;
    }

    .cell-container:not(.current-month) {
        background-color: #f8f8f8;
        color: #999;
        cursor: default;
    }

    .title-day {
        font-size: 1rem;
        font-weight: 500;
    }

    .appointment-container {
        display: grid;
        grid-template-rows: repeat(9, 1fr);
        margin: 5px;
    }

    .appointment {
        padding: 2px 4px;
        margin: 2px 0;
        border-radius: 4px;
        font-size: 0.8rem;
        background-color: #e3f2fd;
        color: #1976d2;
    }

    .appointment.completed {
        background-color: #e8f5e9;
        color: #388e3c;
    }

    .appointment.cancelled {
        background-color: #ffebee;
        color: #d32f2f;
    }
</style>