<template>
    <div class="password-container">
        <form @submit.prevent="handleSubmit" class="password-form">
            <input
                v-model="currentPassword"
                type="password"
                class="password-input"
                placeholder="Current Password"
                required
            />
            <input
                v-model="newPassword"
                type="password"
                class="password-input"
                placeholder="New Password"
                required
            />
            <input
                v-model="confirmPassword"
                type="password"
                class="password-input"
                placeholder="Confirm New Password"
                required
            />

            <div v-if="error" class="error-message">
                {{ errorMessage }}
            </div>

            <div v-if="success" class="success-message">
                Password successfully updated!
            </div>

            <button
                type="submit"
                class="submit-btn"
                :disabled="loading || !isFormValid"
            >
                {{ loading ? 'Updating...' : 'Update Password' }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import apiClient from "../../services/api";
    import { AxiosError } from "axios";

    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const loading = ref(false);
    const error = ref(false);
    const success = ref(false);
    const errorMessage = ref('');

    const isFormValid = computed(() => {
        return currentPassword.value.length > 0 &&
            newPassword.value.length > 0 &&
            confirmPassword.value.length > 0 &&
            newPassword.value === confirmPassword.value;
    });

    const handleSubmit = async () => {
        if (!isFormValid.value) {
            error.value = true;
            errorMessage.value = "Passwords don't match or form is incomplete";
            return;
        }

        loading.value = true;
        error.value = false;
        success.value = false;
        errorMessage.value = '';

        try {
            await apiClient.put('/profile/update-password', {
                currentPassword: currentPassword.value,
                newPassword: newPassword.value
            });

            success.value = true;
            // Reset form
            currentPassword.value = '';
            newPassword.value = '';
            confirmPassword.value = '';

        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = true;

            if (axiosError.response?.status === 401) {
                errorMessage.value = "Current password is incorrect";
            } else if (axiosError.response?.status === 400) {
                errorMessage.value = "New password doesn't meet requirements";
            } else {
                errorMessage.value = "Failed to update password. Please try again.";
            }

            console.error("Error updating password:", axiosError);
        } finally {
            loading.value = false;
        }
    };
</script>

<style scoped>
.password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.password-form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.password-input {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 40px;
    font-size: 1rem;
    outline: none;
}

.password-input:focus {
    border-color: rgba(0, 0, 0, 0.4);
}

.submit-btn {
    width: 100%;
    padding: 0.8rem;
    background: #4a4a4a;
    color: white;
    border: none;
    border-radius: 40px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
    background: #333;
}

.submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.error-message {
    color: #dc3545;
    text-align: center;
    padding: 0.5rem;
}

.success-message {
    color: #28a745;
    text-align: center;
    padding: 0.5rem;
}
</style>