import {createRouter,createWebHistory} from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import DetailPage from "../pages/DetailPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";


const router = createRouter({
    history:createWebHistory(),
    routes: [
        { path: '/', name:"home", component: HomePage },
        { path: '/users/:id', name:"detail", component: DetailPage },
        { path: '/not-found', name:"not-found", component: NotFoundPage },
        { path: '/:pathMatch(.*)*', redirect: "/not-found" }


    ]
})

export{router}