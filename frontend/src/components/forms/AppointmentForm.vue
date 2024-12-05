<template>
    <DialogPortal>
        <DialogOverlay class="dialog-overlay" />
        <DialogContent class="dialog-content">
            <DialogTitle class="dialog-title">Schedule Appointment</DialogTitle>
            <DialogDescription class="dialog-description">
                Please select a doctor and preferred time for your appointment.
            </DialogDescription>

            <form @submit.prevent="handleSubmit" class="appointment-form">
                <div class="form-group">
                    <label class="label">Select Doctor</label>
                    <SelectRoot v-model="selectedDoctor" @update:modelValue="handleDoctorChange">
                        <SelectTrigger class="select-trigger">
                            <SelectValue placeholder="Choose a doctor" />
                            <Icon icon="radix-icons:chevron-down" />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent class="select-content">
                                <SelectViewport>
                                    <SelectGroup>
                                        <SelectItem
                                            v-for="doctor in doctors"
                                            :key="doctor.guid"
                                            :value="doctor.guid"
                                            class="select-item"
                                        >
                                            <SelectItemText>{{ doctor.firstName + " " + doctor.lastName }}</SelectItemText>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectViewport>
                            </SelectContent>
                        </SelectPortal>
                    </SelectRoot>
                </div>

                <div class="form-group">
                    <label class="label">Select Time</label>
                    <SelectRoot
                        v-model="selectedTime"
                        :disabled="!selectedDoctor"
                    >
                        <SelectTrigger class="select-trigger">
                            <SelectValue placeholder="Choose available time" />
                            <Icon icon="radix-icons:chevron-down" />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectContent class="select-content">
                                <SelectViewport>
                                    <SelectGroup>
                                        <SelectItem
                                            v-for="slot in availableTimeSlots"
                                            :key="slot.time"
                                            :value="slot.time"
                                            class="select-item"
                                        >
                                            <SelectItemText>
                                                {{ new Date(slot.time).toLocaleTimeString(['en-us'], { hour: '2-digit', minute: '2-digit' }) }}
                                            </SelectItemText>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectViewport>
                            </SelectContent>
                        </SelectPortal>
                    </SelectRoot>
                </div>

                <div class="dialog-footer">
                    <DialogClose asChild>
                        <button type="button" class="button secondary">Cancel</button>
                    </DialogClose>
                    <button
                        type="submit"
                        class="button primary"
                        :disabled="!selectedDoctor || !selectedTime"
                    >
                        Schedule Appointment
                    </button>
                </div>
            </form>

            <DialogClose class="close-button" aria-label="Close">
                <Icon icon="lucide:x" />
            </DialogClose>
        </DialogContent>
    </DialogPortal>
</template>

<script setup lang="ts">
    import {
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogOverlay,
        DialogPortal,
        DialogTitle,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectItemText,
        SelectPortal,
        SelectRoot,
        SelectTrigger,
        SelectValue,
        SelectViewport
    } from 'radix-vue';
    import { Icon } from '@iconify/vue';
    import {ref, onMounted } from 'vue';
    import apiClient from "../../services/api";
    import {Doctor} from "../../types/user.ts";

    interface TimeSlot {
        time: string;
        available: boolean;
    }

    const emit = defineEmits(['appointmentCreated']);

    const props = defineProps<{
        selectedDate: Date;
    }>();

    const selectedDoctor = ref('');
    const selectedTime = ref('');
    const doctors = ref<Doctor[]>([]);
    const availableTimeSlots = ref<TimeSlot[]>([]);

    const fetchDoctors = async () => {
        try {
            const response = await apiClient.get('/doctors');
            doctors.value = response.data;
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchTimeSlots = async (doctorId: string) => {
        if (!doctorId) return;
        try {
            const response = await apiClient.get(`/appointments/availability/${doctorId}?date=${props.selectedDate.toISOString()}`);
            availableTimeSlots.value = response.data;
        } catch (error) {
            console.error('Error fetching time slots:', error);
        }
    };

    const handleDoctorChange = (value: string) => {
        selectedDoctor.value = value;
        fetchTimeSlots(value);
    };

    const handleSubmit = async () => {
        try {
            await apiClient.post('/appointments/create', {
                doctorId: selectedDoctor.value,
                date: selectedTime.value
            });

            emit('appointmentCreated');
            const closeButton = document.querySelector('[aria-label="Close"]');
            (closeButton as HTMLElement)?.click();

        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    onMounted(() => {
        fetchDoctors();
    });
</script>

<style scoped>
.dialog-overlay {
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-content {
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35),
    0 10px 20px -15px rgba(22, 23, 24, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-title {
    margin: 0;
    font-weight: 500;
    font-size: 17px;
}

.dialog-description {
    margin: 10px 0 20px;
    font-size: 15px;
    line-height: 1.5;
    color: #666;
}

.appointment-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-size: 15px;
    font-weight: 500;
}

.select-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 15px;
    line-height: 1;
    height: 35px;
    gap: 5px;
    background-color: white;
    box-shadow: 0 0 0 1px #ccc;
}

.select-content {
    overflow: hidden;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35);
}

.select-item {
    font-size: 15px;
    line-height: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 35px 0 25px;
    position: relative;
    user-select: none;
}

.select-item:hover {
    background-color: #f5f5f5;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
    height: 35px;
}

.button.primary {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

.button.primary:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.button.secondary {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    cursor: pointer;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.close-button:hover {
    background-color: #f5f5f5;
}

@keyframes overlayShow {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes contentShow {
    from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.96);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>