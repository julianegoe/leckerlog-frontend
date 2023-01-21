import { computed } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
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
        path: '/signup',
        name: 'Signup',
        component: () => import(/* webpackChunkName: "output" */ '../views/Signup.vue'),
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
    {
        path: '/search',
        name: 'Search',
        component: () => import(/* webpackChunkName: "output" */ '../views/Search/Search.vue'),
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

const isAuthenticated = computed(() => localStorage.getItem('auth'));
router.beforeEach(async (to, from) => {
    if (to.name === 'Signup') return true;
    if (
      !isAuthenticated.value &&
      to.name !== 'Login'
    ) {
      return { name: 'Login' }
    } return true
  })


export default router
