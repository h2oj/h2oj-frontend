import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import Index from './views/Index.vue';
import ProblemList from './views/ProblemList.vue';

const routes = [
    { path: '/', component: Index },
    { path: '/problem', component: ProblemList }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
