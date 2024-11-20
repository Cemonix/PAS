<template>
    <div id="app">
        <Navbar />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import {store} from "./store";

const initializeAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
        store.dispatch('login', {
            token,
            user: JSON.parse(user)
        });
    }
}

initializeAuth();
</script>
