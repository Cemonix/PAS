<template>
    <nav class="navbar">
        <ul class="navbar-list">
            <li v-if="!isAuthenticated">
                <router-link to="/login" class="navbar-link">Login</router-link>
            </li>
            <li v-if="isAdmin">
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

const handleLogout = async () => {
    await store.dispatch('logout');
    await router.push('/home');
};
</script>

<style scoped>
.navbar {
    background-color: #333;
    padding: 1rem;
    display: flex;
    justify-content: right;
    flex-shrink: 0;
}

.navbar-list {
    list-style-type: none;
    display: flex;
}

.navbar-link {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    transition: color 0.3s ease;
    margin-right: 1rem;
}

.navbar-link:hover {
    color: #ff6347;
}
</style>
