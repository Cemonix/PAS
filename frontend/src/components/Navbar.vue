<template>
    <nav class="navbar">
        <router-link to="/home" class="home-link">PAS</router-link>
        <ul class="navbar-list">
            <li v-if="!isAuthenticated">
                <router-link to="/login" class="navbar-link">Login</router-link>
            </li>
            <li v-if="isAuthenticated">
                <router-link to="/profile/edit-profile" class="navbar-link">Profile</router-link>
            </li>
            <li v-if="(isAdmin || isDoctor) && isAuthenticated">
                <router-link to="/register-patient" class="navbar-link">Register Patient</router-link>
            </li>
            <li v-if="isAdmin && isAuthenticated">
                <router-link to="/register-doctor" class="navbar-link">Register Doctor</router-link>
            </li>
            <li v-if="isAuthenticated">
                <a href="#" @click.prevent="handleLogout" class="navbar-link">Logout</a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import { key } from '../store';
import router from "../router";

const store = useStore(key);

const isAuthenticated = computed(() => store.state.auth.isAuthenticated);
const isAdmin = computed(() => store.getters.isAdmin);
const isDoctor = computed(() => store.getters.isDoctor);

const handleLogout = async () => {
    await store.dispatch('logout');
    await router.push('/home');
};
</script>

<style scoped>
    .navbar {
        background-color: #333;
        padding: 1rem;
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-rows: auto;
        column-gap: 10px;
    }

    .home-link {
        text-decoration: none;
        color: white;
        font-size: 1.2rem;
        grid-column: 1;
        justify-self: left;
    }

    .home-link:hover {
        color: #ff6347;
    }

    .navbar-list {
        list-style-type: none;
        display: flex;
        justify-content: right;
    }

    .navbar-link {
        text-decoration: none;
        color: white;
        font-size: 1rem;
        transition: color 0.3s ease;
        margin-right: 1rem;
        grid-column: 2;
    }

    .navbar-link:hover {
        color: #ff6347;
    }
</style>
