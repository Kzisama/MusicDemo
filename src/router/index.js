import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/index';
import Home from '@/views/Home/index';
import Search from '@/views/Search/index';
import Play from '@/views/Play/index';


Vue.use (VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        name: 'Layout',
        redirect: '/layout/home',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home,
                meta: {  // 元信息，给路由设置一个自带的信息
                    title: '首页'
                }
            },
            {
                path: 'search',
                name: 'Search',
                component: Search,
                meta: {
                    title: '搜索'
                }
            }
        ]
    },
    {
        path: '/play',
        name: 'Play',
        component: Play,
    }
]

const router = new VueRouter ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
