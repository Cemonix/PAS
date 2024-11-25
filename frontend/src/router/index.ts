import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store'
import HomePage from '../pages/Home.vue';
import LoginPage from '../pages/Login.vue';
import DoctorRegistrationPage from '../pages/DoctorRegistration.vue';
import PatientRegistrationPage from '../pages/PatientRegistration.vue';

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
