import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    // se anula: se lista todos los productos en lugar de listar por el "TIPO"
    path: '/prodLista/:id',
    name: 'prodLista',
    component: () => import('../views/producto/ViewProdList.vue'),

  },
  {
    path: '/nuevoProducto',
    name: "nuevoProducto",
    component: () => import('../views/producto/ViewProdForm.vue')
  },
  {
    path: '/editarProducto/:id',
    name: "editarProducto",
    component: () => import('../views/producto/ViewProdForm.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
