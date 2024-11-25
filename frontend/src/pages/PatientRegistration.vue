<template>
    <RegistrationForm
        title="Patient Registration"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
        @submit="handleRegistration"
    >
        <input type="text" v-model="formData.email" placeholder="Email" required />
        <PasswordInput v-model="formData.password" />
        <input type="text" v-model="formData.firstName" placeholder="First name" required />
        <input type="text" v-model="formData.lastName" placeholder="Last name" required />
        <input type="text" v-model="formData.phoneNumber" placeholder="Phone number" required />
        <input type="text" v-model="formData.dateOfBirth" placeholder="Date of birth" required />
        <input type="text" v-model="formData.city" placeholder="City" required />
        <input type="text" v-model="formData.street" placeholder="Street" required />
        <input type="text" v-model="formData.postalCode" placeholder="Postal code" required />
    </RegistrationForm>
</template>

<script setup lang="ts">
import {useRegistration} from "../composables/useRegistration.ts";
import PasswordInput from "../components/PasswordInput.vue";
import RegistrationForm from "../components/RegistrationForm.vue";

const defaultFormState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    city: '',
    street: '',
    postalCode: ''
};

const { formData, successMessage, errorMessage, handleRegistration } =
    useRegistration('/auth/register/patient', defaultFormState);
</script>

<style scoped>
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
</style>
