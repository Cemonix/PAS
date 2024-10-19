<template>
    <nav class="navbar">
        <ul class="navbar-list">
            <li>
                <router-link to="/login" class="navbar-link">Login</router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Navbar",
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

    .navbar-list li {
        margin-right: 1.5rem;
    }

    .navbar-link {
        text-decoration: none;
        color: white;
        font-size: 1rem;
        transition: color 0.3s ease;
    }

    .navbar-link:hover {
        color: #ff6347;
    }
</style>
