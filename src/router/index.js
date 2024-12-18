import {createRouter,createWebHistory} from 'vue-router';

import HomePage from "./pages/HomePage.vue";

const routes = createRouter({
    history:createWebHistory(),
    routes: [
        { path: '/', name:"home", component: HomePage }
    ]
})