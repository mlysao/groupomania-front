import Vue from 'vue';
import VueRouter from 'vue-router';
import Accueil from '@/components/Accueil';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Accueil',
        component: Accueil,
    },
    {
        path: '/9gag',
        name: '9GAG',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "9GAG" */ '../components/9GAG/Publication.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/reddit',
        name: 'Reddit',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../components/Reddit/Article.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/signup',
        name: 'Signup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../components/Auth/Signup.vue'),
    },
    {
        path: '/utilisateur',
        name: 'Utilisateur',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../components/Utilisateur/Utilisateur.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/publication',
        name: 'Publication',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "9GAG" */ '../components/9GAG/Publier.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

// check auth sinon retour sur accueil login
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!sessionStorage.getItem('token')) {
            next({
                path: "/",
                params: {nextUrl: to.fullPath},
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
