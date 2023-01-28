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
        path: '/auth',
        component: () => import(/* webpackChunkName: "output" */ '../views/Auth.vue'),
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import(/* webpackChunkName: "output" */ '../views/Login.vue'),
            },
            {
                path: 'signup',
                name: 'Signup',
                component: () => import(/* webpackChunkName: "output" */ '../views/Signup.vue'),
            },
        ]
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
        path: '/edit/:foodId',
        name: 'EditFood',
        component: () => import(/* webpackChunkName: "output" */ '../views/EditFood.vue'),
        props: true,
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

router.beforeEach(async (to, from) => {
    if (to.name === 'Signup') return true;
    if (
      !localStorage.getItem('auth') &&
      to.name !== 'Login'
    ) {
      return { name: 'Login' }
    } return true
  })


export default router
