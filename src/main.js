import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faAngleLeft, faAngleDoubleLeft,
    faAngleRight, faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import Index from './views/Index.vue';
import ProblemList from './views/ProblemList.vue';
import config from './config';

const routes = [
    { path: '/', component: Index },
    { path: '/problem', component: ProblemList }
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
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
