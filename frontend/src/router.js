import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import CameraView from './views/CameraView.vue'
import FullscreenView from './views/FullscreenView.vue'
import UnauthenticatedView from './views/UnauthenticatedView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/camera',
        name: 'Camera',
        component: CameraView,
    },
    {
        path: '/fullscreen',
        name: 'Fullscreen',
        component: FullscreenView,
    },
    {
        path: '/unauthenticated',
        name: 'Unauthenticated',
        component: UnauthenticatedView,
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    // },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
