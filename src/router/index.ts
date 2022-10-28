import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user';
import Home from '/src/views/Home/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import(/* webpackChunkName: "output" */ '../views/Categories/Categories.vue'),
    },
    {
        path: '/stats',
        name: 'Stats',
        component: () => import(/* webpackChunkName: "output" */ '../views/Stats.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "output" */ '../views/Login.vue'),
    },
    {
        path: '/food/:cuisine',
        name: 'Food',
        component: () => import(/* webpackChunkName: "output" */ '../views/DisplayRestaurants.vue'),
        props: true,
    },
    {
        path: '/details/:foodId',
        name: 'Details',
        component: () => import(/* webpackChunkName: "output" */ '../views/Details.vue'),
        props: true,
    },
    {
        path: '/add',
        name: 'AddFood',
        component: () => import(/* webpackChunkName: "output" */ '../views/AddFood.vue'),
    },
    {
        path: '/edit',
        name: 'EditFood',
        component: () => import(/* webpackChunkName: "output" */ '../views/EditFood.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
      },
});

router.beforeEach((to, from) => {
    const store = useUserStore();
    if (to.name !== 'Login' && !store.isAuthenticated) {
        return { name: 'Login' }
    }
    return true
})




export default router
