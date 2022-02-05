import { createWebHistory, createRouter, routerViewLocationKey } from "vue-router"

import LandingPage from "../views/LandingPage/LandingPage.vue"
import Login from "../views/Auth/Login.vue"
import Register from "../views/Auth/Register.vue"

import Home from "../views/Home/Home.vue"
import Profile from "../views/Profile/Profile.vue"
import EditProfile from "../views/EditProfile/EditProfile.vue"

const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
        meta: { requireVisitor: true }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { requireVisitor: true }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { requireVisitor: true }
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: { requireAuth: true }
    },
    {
        path: "/profile/:id",
        name: "Profile",
        component: Profile,
        meta: { requireAuth: true }
    },
    {
        path: "/profile/edit/:id",
        name: "EditProfile",
        component: EditProfile,
        meta: { requireAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token')
    if(to.matched.some(record => record.meta.requireAuth)) {
        if(!isAuthenticated) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else if(to.matched.some(record => record.meta.requireVisitor)) {
        if(isAuthenticated) {
            next({
                path: '/home'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router