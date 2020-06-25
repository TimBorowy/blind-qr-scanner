import Vue from 'vue';
import VueRouter from 'vue-router';
import Menu from '../components/Menu.vue';
import Scanner from '../components/Scanner.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Scanner,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
];

const router = new VueRouter({
  mode: '',
  base: process.env.BASE_URL,
  routes,
});

export default router;