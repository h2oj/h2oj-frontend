import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import { VueCookieNext } from 'vue-cookie-next';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faAngleLeft, faAngleDoubleLeft,
    faAngleRight, faAngleDoubleRight,
    faAngleDown,
    faWrench, faCheck, faTimes, faPlus, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ElementPlus from 'element-plus';
import Vue3Progress from 'vue3-progress';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'element-plus/lib/theme-chalk/index.css';

import App from './App.vue';
import Admin from './views/Admin.vue';
import Contest from './views/Contest.vue';
import ContestEditor from './views/ContestEditor.vue';
import ContestList from './views/ContestList.vue';
import Index from './views/Index.vue';
import Login from './views/Login.vue';
import Page404 from './views/404.vue';
import Problem from './views/Problem.vue';
import ProblemEditor from './views/ProblemEditor.vue';
import ProblemList from './views/ProblemList.vue';
import Submission from './views/Submission.vue';
import SubmissionList from './views/SubmissionList.vue';
import User from './views/User.vue';
import UserSettings from './views/UserSettings.vue';

import config from './config';

const routes = [
    { path: '/', component: Index },
    { path: '/admin', component: Admin },
    { path: '/contest', component: ContestList },
    { path: '/contest/:contest_id', component: Contest },
    { path: '/contest/:contest_id/edit', component: ContestEditor },
    { path: '/login', component: Login },
    { path: '/problem', component: ProblemList },
    { path: '/problem/:pid/edit', component: ProblemEditor },
    { path: '/problem/:pid', component: Problem },
    { path: '/submission', component: SubmissionList },
    { path: '/submission/:sid', component: Submission },
    { path: '/user/:uid', component: User },
    { path: '/user/settings', component: UserSettings },
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
    faWrench, faCheck, faTimes, faPlus, faArrowLeft
);

const app = createApp(App);
app.config.globalProperties.config = config;
app.use(router);
app.use(ElementPlus);
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
