<template>
    <div class="password-container">
        <input
            :type="showPassword ? 'text' : 'password'"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            placeholder="Password"
            required
        />
        <i :class="showPassword ? 'bx bx-hide' : 'bx bx-show'" @click="togglePasswordVisibility"></i>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    defineProps<{
        modelValue: string;
    }>();

    defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();

    const showPassword = ref(false);
    const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
    };
</script>

<style scoped>
    input {
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

    input::placeholder {
        color: #fff;
    }

    .password-container {
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
</style>