import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/LoginForm.vue';
// import Home from './views/Home.vue';
// import Add from './views/Add.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import(/* webpackChunkName: "reg" */ './components/RegForm.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import(/* webpackChunkName: "list" */ './views/List.vue'),
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ './views/User.vue'),
      },
    ],
  },
  {
    path: '/add',
    name: 'add',
    component: () => import(/* webpackChunkName: "add" */ './views/Add.vue'),
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

export default router;
