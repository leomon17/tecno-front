import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UnidadesView from '../views/UnidadesView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/unidades',
      name: 'unidades',
      component: () => import('../components/unidades.vue')
    },
    {
      path: '/unidades2',
      name: 'unidades2',
      component: () => import('../components/unidades.vue')
    },
    {
      path: '/reporte',
      name: 'reporte',
      component: () => import('../components/reporte.vue')
    },
    {
      path: '/reportelocal',
      name: 'reportelocal',
      component: () => import('../components/reportelocal.vue')
    }
  ]
})

export default router
