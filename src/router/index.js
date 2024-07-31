import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/lista/0',
    component: HomeView
  },
  {
    path: "/lista/:tipo",
    name: 'lista',
    component: () => import('../views/producto/ViewProdList.vue'),
  },
  {
    path: "/lista1/:tipo",
    name: 'lista1',
    component: () => import('../views/producto/ViewProdListF.vue'),
  },
  {
    path: "/lista2/:tipo",
    name: 'lista2',
    component: () => import('../views/producto/ViewProdListP.vue'),
  },
  {
    path: "/lista3/:tipo",
    name: 'lista3',
    component: () => import('../views/producto/ViewProdListE.vue'),
  },
  {
    path: "/lista4/:tipo",
    name: 'lista4',
    component: () => import('../views/producto/ViewProdListL.vue'),
  },
  {
    path: '/nuevoProducto',
    name: "nuevoProducto",
    component: () => import('../views/producto/ViewProdForm.vue')
  },
  {
    path: '/editarProducto/:id',
    name: "editarProducto",
    component: () => import('../views/producto/ProdFormEdit.vue')
  },
  {
    path: '/facturas',
    name: "facturas",
    component: () => import('../views/facturas/ViewFacturasList.vue')
  },
  {
    path: "/cargarFactura",
    name: "cargarFactura",
    component: () => import('../views/facturas/ViewFacturaForm.vue')
  },
  {
    path: "/facturaProductos",
    name: "facturaProductos",
    component: () => import('../views/facturas/ViewFacturaListProd.vue')
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
