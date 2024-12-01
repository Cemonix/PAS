<template>
    <div class="view-container">
        <div v-if="loading">Loading...</div>
        <div v-else-if="errorOccurred" class="error">{{ errorMessage }}</div>
        <template v-else>
            <p
                v-for="(value, key) in profileData"
                :key="key"
                class="user-data"
            >
                {{ key }}: {{ key === 'role' ? value.toLowerCase() : value }}
            </p>
        </template>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted, Ref} from 'vue';
    import apiClient from "../../services/api.ts";
    import { AxiosError } from "axios";

    const profileData: Ref<{email: string, role: string}> = ref({email: "", role: ""});
    const loading = ref(true);
    const errorOccurred = ref(false);
    const errorMessage = ref('');

    const fetchProfileData = async () => {
        try {
            const response = await apiClient.get('/profile/get-profile');
            profileData.value = response.data;
            loading.value = false;
        } catch (err) {
            const error = err as AxiosError;
            errorOccurred.value = true;

            if (error.response?.status === 401) {
                errorMessage.value = "Invalid user role or missing profile data.";
            } else if (error.response?.status === 403) {
                errorMessage.value = "Profile data not found.";
            } else {
                errorMessage.value = "Error receiving profile data.";
            }

            if (error.response) {
                console.error("Error response from server: ", error.response.data);
            } else {
                console.error("Error during receiving profile data: ", error);
            }
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchProfileData();
    });
</script>

<style scoped>
    .view-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        background: transparent;
    }

    .user-data {
        width: 80%;
        background: transparent;
        outline: none;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 40px;
        font-size: 1rem;
        text-align: center;
        padding: 0.8rem;
        margin: 20px 0;
    }

    .error {
        color: red;
        grid-column: 1 / -1;
        text-align: center;
        font-size: 1.5rem;
        padding: 20px;
    }
</style>