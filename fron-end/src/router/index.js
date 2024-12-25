import AppLayout from '@/layout/AppLayout.vue';
import { getAccessToken } from '@/utils/cookies';
import { createRouter, createWebHistory } from 'vue-router';

const isAuthenticated = () => {
    return !!getAccessToken();
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/team',
                    name: 'team',
                    component: () => import('@/views/pages/Team.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/warehouse',
                    name: 'warehouse',
                    component: () => import('@/views/pages/Warehouse/index.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/warehouse/add',
                    name: 'add',
                    component: () => import('@/views/pages/Warehouse/create.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue'),
            meta: { requiresAuth: false }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else if (to.name === 'login' && !!isAuthenticated()) {
        next('/');
    } else {
        next();
    }
});

export default router;
