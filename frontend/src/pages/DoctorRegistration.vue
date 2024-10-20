<template>
    <div class="doctor-registration-page">
        <div class="wrapper">
            <h1>Doctor registration</h1>
            <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
            <form @submit.prevent="handleRegistration">
                <div class="input-box">
                    <input type="text" v-model="formData.email" placeholder="Email" required />
                    <div class="password-container">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            v-model="formData.password"
                            placeholder="Password"
                            required
                        />
                        <i :class="showPassword ? 'bx bx-hide' : 'bx bx-show'" @click="togglePasswordVisibility"></i>
                    </div>
                    <input type="text" v-model="formData.firstName" placeholder="First name" required />
                    <input type="text" v-model="formData.lastName" placeholder="Last name" required />
                    <input type="text" v-model="formData.contactEmail" placeholder="Contact email" required />
                    <input type="text" v-model="formData.phoneNumber" placeholder="Phone number" required />
                    <input type="text" v-model="formData.location" placeholder="Location" required />
                    <input type="text" v-model="formData.specialization" placeholder="Specialization" required />
                </div>
                <button type="submit" class="btn">Register</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';
import { AxiosError } from "axios";

import apiClient from '../services/api';

export default defineComponent({
    name: "DoctorRegistrationPage",
    setup() {
        const router = useRouter();
        
        const errorMessage = ref("");

        const formData = ref({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            contactEmail: '',
            location: '',
            phoneNumber: '',
            specialization: ''
        });

        const showPassword = ref(false);
        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        const handleRegistration = async () => {
            try {
                const response = await apiClient.post('/auth/register/doctor', formData.value);

                if (response.status === 200) {
                    router.push('/home');
                } else {
                    console.log('Registration failed: ' + response.data.message);
                }
            } catch (err) {
                errorMessage.value = "Registration failed.";
                
                const error = err as AxiosError
                if (error.response) {
                    console.error("Error response from server: ", error.response.data);
                } else {
                    console.error("Error during registration: ", error);
                }
            }
        };

        return {
            formData,
            errorMessage,
            showPassword,
            togglePasswordVisibility,
            handleRegistration,
        };
    },
});
</script>

<style scoped>
.doctor-registration-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(150, 150, 150);
    flex-grow: 1;
}

.wrapper {
    width: 840px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: #fff;
    margin: 15px;
    padding: 30px 40px;
}

.wrapper h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 10px;
}

.wrapper .input-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1rem;
    margin: 20px 0;
    border-radius: 30px;
    padding: 5px;
}

.input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    font-size: 1rem;
    color: #fff;
    padding: 20px 45px 20px 20px;
}

.input-box input::placeholder {
    color: #fff;
}

.input-box .password-container {
    position: relative;
}

.password-container i {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
}

.error-message {
    text-align: center;
    color: rgba(205, 1, 1, 0.829);
}

.wrapper .btn {
    width: 100%;
    height: 45px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
}
</style>
