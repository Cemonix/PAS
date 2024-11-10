<template>
    <nav class="navbar">
        <ul class="navbar-list">
            <li>
                <router-link to="/login" class="navbar-link">Login</router-link>
            </li>
            <li v-if="isAdmin">
                <router-link to="/register-doctor" class="navbar-link">Register Doctor</router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex';

import { key } from '../store';

export default defineComponent({
    name: "Navbar",
    setup() {
        const store = useStore(key);

        const isAdmin = store.getters.isAdmin;

        return {
            isAdmin,
        };
    },
});
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
