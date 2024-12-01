<template>
    <div class="profile-container">
        <div class="profile-grid">
            <div class="top-panel">
                <h1 class="title">Profile</h1>
            </div>
            <div class="left-panel">
                <button
                    v-for="(panel_name, panel_id) in panels"
                    :key="panel_id"
                    class="btn"
                    :class="{ active: activePanel === panel_id }"
                    @click="navigateToPanel(panel_id as Panel)"
                >
                    {{ panel_name }}
                </button>
            </div>
            <div class="right-panel">
                <ViewProfile v-if="activePanel === 'view-profile'" />
                <UpdatePassword v-if="activePanel === 'update-password'" />
                <DeleteAccount v-if="activePanel === 'delete-account'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import ViewProfile from "../components/profile/ViewProfile.vue";
    import DeleteAccount from "../components/profile/DeleteAccount.vue";
    import UpdatePassword from "../components/profile/ChangePassword.vue";
    import type { Panel } from "../types/ui.ts"

    const router = useRouter();
    const route = useRoute();

    const activePanel = ref<Panel>('view-profile');

    const panels: Record<Panel, string> = {
        'view-profile': 'View Profile',
        'update-password': 'Update Password',
        'delete-account': 'Delete Account'
    } as const;

    watch(() => route.params.panel as Panel, (newPanel) => {
        if (newPanel && newPanel in panels) {
            activePanel.value = newPanel;
        }
    });

    const navigateToPanel = (panel: Panel) => {
        router.push(`/profile/${panel}`);
    };

    onMounted(() => {
        const panel = route.params.panel as Panel;
        if (panel && panel in panels) {
            activePanel.value = panel;
        } else {
            navigateToPanel('view-profile');
        }
    });
</script>

<style scoped>
    .profile-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        background: rgb(150, 150, 150);
        padding: 2rem;
    }

    .profile-grid {
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
        grid-column: 2;
        grid-row: 1;
        padding: 1.5rem;
        border-bottom: 1px solid #e0e0e0;
    }

    .title {
        font-size: 2rem;
        color: #333;
    }

    .left-panel {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        grid-column: 1;
        grid-row: 1/-1;
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

    .btn.active {
        background-color: #d2d2d2;
    }

    .btn:hover {
        background: #b6b6b6;
    }

    .right-panel {
        grid-column: 2;
        grid-row: 2;
    }
</style>