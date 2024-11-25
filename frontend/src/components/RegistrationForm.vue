<template>
    <div class="registration-page">
        <div class="wrapper">
            <h1>{{ title }}</h1>
            <div class="success-message" v-if="successMessage">{{ successMessage }}</div>
            <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
            <form @submit.prevent="handleSubmit">
                <div class="input-box">
                    <slot></slot>
                </div>
                <button type="submit" class="btn">Register</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        title: string;
        successMessage: string;
        errorMessage: string;
    }>();

    const emit = defineEmits<{
        (e: 'submit'): void;
    }>();

    const handleSubmit = () => {
        emit('submit');
    };
</script>

<style scoped>
.registration-page {
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

.success-message {
    text-align: center;
    color: #4BB543;
    margin: 10px 0;
}

.error-message {
    text-align: center;
    color: rgba(205, 1, 1, 0.829);
    margin: 10px 0;
}
</style>
