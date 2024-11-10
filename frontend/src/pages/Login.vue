<template>
    <div class="login-page">
        <div class="wrapper">
            <h1>Login</h1>
            <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
            <form @submit.prevent="handleLogin">
                <div class="input-box">
                    <input type="text" v-model="email" placeholder="Email" required />
                    <i class="bx bxs-user"></i>
                </div>
                <div class="input-box">
                    <input type="password" v-model="password" placeholder="Password" required />
                    <i class="bx bxs-lock-alt"></i>
                </div>

                <button type="submit" class="btn">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { key } from '../store'
import { AxiosError } from "axios";

import apiClient from '../services/api';

const router = useRouter();
const store = useStore(key);

const errorMessage = ref("");
const email = ref("");
const password = ref("");

const handleLogin = async () => {
    try {
        const response = await apiClient.post('/auth/login', {
            email: email.value,
            password: password.value,
        });

        if (response.status === 200) {
            const { token, user } = response.data;
            await store.dispatch('login', { token, user });
            await router.push('/home');
        } else {
            console.log('Login failed: ' + response.data.message);
        }
    } catch (err) {
        errorMessage.value = "Login failed.";

        const error = err as AxiosError
        if (error.response) {
            console.error("Error response from server:", error.response?.data);
        } else {
            console.error("Error during login:", error);
        }
    }
};
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(150, 150, 150);
    flex-grow: 1;
}

.wrapper {
    width: 420px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: #fff;
    border-radius: 10px;
    padding: 30px 40px;
}

.wrapper h1 {
    font-size: 2rem;
    text-align: center;
}

.wrapper .input-box {
    position: relative;
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

.input-box i {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 1.5rem;
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
