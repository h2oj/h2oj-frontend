import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faAngleLeft, faAngleDoubleLeft,
    faAngleRight, faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue3Progress from 'vue3-progress';

import App from './App.vue';
import Index from './views/Index.vue';
import ProblemList from './views/ProblemList.vue';
import Problem from './views/Problem.vue';
import config from './config';

const routes = [
    { path: '/', component: Index },
    { path: '/problem', component: ProblemList },
    { path: '/problem/:pid', component: Problem }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

library.add(
    faAngleLeft, faAngleDoubleLeft,
    faAngleRight, faAngleDoubleRight
);

const app = createApp(App);
app.config.globalProperties.config = config;
app.use(router);
app.use(Vue3Progress, {
    position: 'fixed',
    height: '3px',
    color: '#66ccff'
});
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
