import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user';
import Cuisines from '/src/views/Cuisines.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Cuisines,
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
        path: '/add',
        name: 'AddFood',
        component: () => import(/* webpackChunkName: "output" */ '../views/AddFood.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const store = useUserStore();
    if (to.name !== 'Login' && !store.isAuthenticated) {
        return { name: 'Login' }
    }
    return true
  })
  



export default router
