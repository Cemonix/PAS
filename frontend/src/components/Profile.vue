<template>
    <div class="container">
        <div class="grid">
            <div class="top-panel">
                <h1 class="title">{{title}}</h1>
            </div>
            <div class="left-panel">
                <button class="btn">Edit profile</button>
                <button class="btn">Update password</button>
                <button class="btn">Delete account</button>
            </div>
            <div class="right-panel">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        title: string;
    }>();
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        background: rgb(150, 150, 150);
        padding: 2rem;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: auto 1fr;
        background: white;
        flex-grow: 1;
        box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
    }

    .top-panel {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: 1/-1;
        grid-row: 1;
        padding: 1.5rem;
        border-bottom: 1px solid #e0e0e0;
    }

    .title {
        font-size: 1.5rem;
        color: #333;
    }

    .left-panel {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        grid-column: 1;
        grid-row: 2;
        border-right: 1px solid #e0e0e0;
    }

    .left-panel .btn {
        width: 100%;
        height: 45px;
        background: #fff;
        border: none;
        border-radius: 6px;
        outline: none;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        color: #333;
        transition: all 0.2s ease;
    }

    .btn:hover {
        background: #b6b6b6;
    }

    .right-panel {
        grid-column: 2;
        grid-row: 2;
    }
</style>