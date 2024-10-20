import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/Home.vue';
import LoginPage from '../pages/Login.vue';
import DoctorRegistrationPage from '../pages/DoctorRegistration.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register-doctor', component: DoctorRegistrationPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
