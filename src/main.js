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

import App from './App.vue';
import Index from './views/Index.vue';
import Problem from './views/Problem.vue';
import ProblemEditor from './views/ProblemEditor.vue';
import ProblemList from './views/ProblemList.vue';
import Submission from './views/Submission.vue';
import SubmissionList from './views/SubmissionList.vue';
import ContestList from './views/ContestList.vue';
import Login from './views/Login.vue';
import config from './config';

const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/problem', component: ProblemList },
    { path: '/problem/:pid/edit', component: ProblemEditor },
    { path: '/problem/:pid', component: Problem },
    { path: '/submission', component: SubmissionList },
    { path: '/submission/:sid', component: Submission },
    { path: '/contest', component: ContestList }
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
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');

VueCookieNext.config({ expire: '7d' });
