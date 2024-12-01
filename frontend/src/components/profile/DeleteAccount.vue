<template>
    <div class="delete-container">
        <AlertDialogRoot>
            <AlertDialogTrigger asChild>
                <button class="delete-btn">Delete Account</button>
            </AlertDialogTrigger>

            <AlertDialogPortal>
                <AlertDialogOverlay class="dialog-overlay" />
                <AlertDialogContent class="dialog-content">
                    <AlertDialogTitle class="dialog-title">
                        Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription class="dialog-description">
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers.
                    </AlertDialogDescription>

                    <div class="dialog-footer">
                        <AlertDialogCancel asChild>
                            <button class="cancel-btn">Cancel</button>
                        </AlertDialogCancel>

                        <AlertDialogAction asChild>
                            <button
                                class="confirm-btn"
                                :disabled="loading"
                                @click="handleDelete"
                            >
                                {{ loading ? 'Deleting...' : 'Delete Account' }}
                            </button>
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialogRoot>

        <div v-if="error" class="error-message">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { AxiosError } from "axios";
    import {
        AlertDialogRoot,
        AlertDialogTrigger,
        AlertDialogPortal,
        AlertDialogOverlay,
        AlertDialogContent,
        AlertDialogTitle,
        AlertDialogDescription,
        AlertDialogAction,
        AlertDialogCancel,
    } from 'radix-vue';
    import apiClient from "../../services/api";
    import {store} from "../../store";

    const router = useRouter();
    const loading = ref(false);
    const error = ref(false);
    const errorMessage = ref('');

    const handleDelete = async () => {
        loading.value = true;
        error.value = false;
        errorMessage.value = '';

        try {
            await apiClient.delete('/profile/delete-account');
            await store.dispatch('logout');
            await router.push('/home');

        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = true;

            if (axiosError.response?.status === 401) {
                errorMessage.value = "Not authorized to delete account";
            } else {
                errorMessage.value = "Failed to delete account. Please try again.";
            }

            console.error("Error deleting account:", axiosError);
        } finally {
            loading.value = false;
        }
    };
</script>

<style scoped>
.delete-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 1rem;
}

.delete-btn {
    padding: 0.8rem 2rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 40px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.delete-btn:hover:not(:disabled) {
    background: #c82333;
}

.delete-btn:disabled {
    background: #e4606d;
    cursor: not-allowed;
}

.error-message {
    color: #dc3545;
    text-align: center;
    padding: 0.5rem;
}

.dialog-overlay {
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-content {
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-title {
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.5rem;
}

.dialog-description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1.5rem;
}

.dialog-footer {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.cancel-btn {
    padding: 0.5rem 1rem;
    background: #e9ecef;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
}

.confirm-btn {
    padding: 0.5rem 1rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
}

.confirm-btn:hover:not(:disabled) {
    background: #c82333;
}

.cancel-btn:hover {
    background: #dee2e6;
}

@keyframes overlayShow {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes contentShow {
    from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.96);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>
