import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store'
import HomePage from '../pages/Home.vue';
import LoginPage from '../pages/auth/Login.vue';
import DoctorRegistrationPage from '../pages/auth/DoctorRegistration.vue';
import PatientRegistrationPage from '../pages/auth/PatientRegistration.vue';
import Profile from "../pages/Profile.vue";

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
        name: 'Profile',
        component: Profile,
        children: [
            {
                path: ':panel?',
                component: Profile,
            }
        ],
        meta: { requiresAuth: true },
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
