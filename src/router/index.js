// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CompletedTasksPage from '../views/CompletedTasksPage.vue';
import DeletedTasksPage from '../views/DeletedTasksPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/completed',
    name: 'CompletedTasksPage',
    component: CompletedTasksPage
  },
  {
    path: '/deleted',
    name: 'DeletedTasksPage',
    component: DeletedTasksPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
