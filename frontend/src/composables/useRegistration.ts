import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { AxiosError } from 'axios';
import { key } from '../store';
import apiClient from "../services/api.ts";

export function useRegistration<T>(endpoint: string, defaultState: T) {
    const router = useRouter();
    const store = useStore(key);

    const successMessage = ref("");
    const errorMessage = ref("");
    const formData = ref({...defaultState});

    const handleRegistration = async () => {
        try {
            const response = await apiClient.post(endpoint, formData.value);

            if (response.status === 201) {
                successMessage.value = "Registration successful";
                formData.value = {...defaultState};
            }
        } catch (err) {
            const error = err as AxiosError;

            if (error.response?.status === 401) {
                errorMessage.value = "Unauthorized access. Please login again.";
                await store.dispatch('logout');
                await router.push('/login');
                return;
            }

            if (error.response?.status === 403) {
                errorMessage.value = "You don't have permission to register.";
                return;
            }

            errorMessage.value = "Registration failed.";

            if (error.response) {
                console.error("Error response from server: ", error.response.data);
            } else {
                console.error("Error during registration: ", error);
            }
        }
    };

    return {
        formData,
        successMessage,
        errorMessage,
        handleRegistration
    };
}