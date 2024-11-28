import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CadastroView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: () => import('../views/ProdutosView.vue')
  },
  {
    path: '/promocoes',
    name: 'promocoes',
    component: () => import('../views/ProdutosDescontados.vue')
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: () => import('../views/ProdutosFavoritos.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
