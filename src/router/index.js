import {createRouter,createWebHistory} from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import DetailPage from "../pages/DetailPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import UserFormPage from '../pages/UserFormPage.vue';


const router = createRouter({
    history:createWebHistory(),
    routes: [
        { path: '/', name:"home", component: HomePage },
        { path: '/users/create', name:"create", component: UserFormPage },
        { path: '/users/:id', name:"detail", component: DetailPage },
        { path: '/users/:id/update', name:"update", component: UserFormPage },
        { path: '/not-found', name:"not-found", component: NotFoundPage },
        { path: '/:pathMatch(.*)*', redirect: "/not-found" }
    ]
})

export{router}