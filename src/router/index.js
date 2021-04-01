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
        component: () => import(/* webpackChunkName: "reddit" */ '../components/9GAG/Publication.vue'),
    },
    {
        path: '/reddit',
        name: 'Reddit',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "reddit" */ '../components/Reddit/Article.vue'),
    },
    {
        path: '/signup',
        name: 'Signup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "reddit" */ '../components/Signup.vue'),
    },
    {
        path: '/utilisateur',
        name: 'Utilisateur',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "reddit" */ '../components/Utilisateur/Utilisateur.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router
