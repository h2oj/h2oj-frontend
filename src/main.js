import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import { VueCookieNext } from 'vue-cookie-next';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faAngleLeft, faAngleDoubleLeft,
    faAngleRight, faAngleDoubleRight,
    faAngleDown,
    faWrench, faCheck, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue3Progress from 'vue3-progress';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import Index from './views/Index.vue';
import Login from './views/Login.vue';
import Page404 from './views/404.vue';
import Problem from './views/Problem.vue';
import ProblemEditor from './views/ProblemEditor.vue';
import ProblemList from './views/ProblemList.vue';
import Submission from './views/Submission.vue';
import SubmissionList from './views/SubmissionList.vue';
import User from './views/User.vue';

import config from './config';

const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/problem', component: ProblemList },
    { path: '/problem/:pid/edit', component: ProblemEditor },
    { path: '/problem/:pid', component: Problem },
    { path: '/submission', component: SubmissionList },
    { path: '/submission/:sid', component: Submission },
    { path: '/user/:uid', component: User },
    { path: '/:catchAll(.*)', component: Page404 }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

library.add(
    faAngleLeft, faAngleDoubleLeft,
    faAngleRight, faAngleDoubleRight,
    faAngleDown,
    faWrench, faCheck, faArrowLeft
);

const app = createApp(App);
app.config.globalProperties.config = config;
app.use(router);
app.use(VueCookieNext);
app.use(Vue3Progress, {
    position: 'fixed',
    height: '3px',
    color: '#66ccff'
});
app.use(VueSweetalert2);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');

VueCookieNext.config({ expire: '7d' });
