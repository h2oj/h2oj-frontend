import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import { VueCookieNext } from 'vue-cookie-next';
import { library } from '@fortawesome/fontawesome-svg-core';
import { VueSweetalert2 } from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {
    faAngleLeft, faAngleDoubleLeft,
    faAngleRight, faAngleDoubleRight,
    faWrench, faCheck, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue3Progress from 'vue3-progress';

import App from './App.vue';
import Index from './views/Index.vue';
import Problem from './views/Problem.vue';
import ProblemEditor from './views/ProblemEditor.vue';
import ProblemList from './views/ProblemList.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import config from './config';

const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/register', component : Register},
    { path: '/problem', component: ProblemList },
    { path: '/problem/:pid/edit', component: ProblemEditor },
    { path: '/problem/:pid', component: Problem }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

library.add(
    faAngleLeft, faAngleDoubleLeft,
    faAngleRight, faAngleDoubleRight,
    faWrench, faCheck, faArrowLeft
);

const app = createApp(App);
app.config.globalProperties.config = config;
app.use(router);
app.use(VueCookieNext);
app.use(VueSweetalert2);
app.use(Vue3Progress, {
    position: 'fixed',
    height: '3px',
    color: '#66ccff'
});
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');

VueCookieNext.config({ expire: '7d' });