import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store'
import HomePage from '../pages/Home.vue';
import LoginPage from '../pages/Login.vue';
import DoctorRegistrationPage from '../pages/DoctorRegistration.vue';
import PatientRegistrationPage from '../pages/PatientRegistration.vue';
import ChangePasswordPage from "../pages/user/ChangePassword.vue";
import DeleteAccountPage from "../pages/user/DeleteAccount.vue";
import EditProfilePage from "../pages/user/EditProfile.vue";

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/login', component: LoginPage },
    {
        path: '/register-doctor',
        component: DoctorRegistrationPage,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/register-patient',
        component: PatientRegistrationPage,
        meta: {
            requiresAuth: true,
            requiresDoctor: true
        }
    },
    {
        path: '/profile',
        meta: { requiresAuth: true },
        children: [
            {
                path: 'edit-profile',
                component: EditProfilePage,
            },
            {
                path: 'change-password',
                component: ChangePasswordPage,
            },
            {
                path: 'delete-account',
                component: DeleteAccountPage,
            }
        ]
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth) {
        if (!store.state.auth.isAuthenticated) {
            next('/login');
            return;
        }

        if (to.meta.requiresAdmin && !store.getters.isAdmin) {
            next('/unauthorized');
            return;
        }

        if (!store.getters.isAdmin && to.meta.requiresDoctor && !store.getters.isDoctor) {
            next('/unauthorized');
            return;
        }
    }

    next();
});

export default router;
