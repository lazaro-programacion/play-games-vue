import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/juegos',
    name: 'Juegos',
    component: () => import('../views/GameList.vue')
  },
  {
    path: '/juego-palabras',
    name: 'Juego-Palabras',
    component: () => import('../views/JuegoPalabras.vue')
  },
  {
    path: '/ahorcado',
    name: 'Ahorcado',
    component: () => import('../views/GameAhorcado.vue')
  },
  {
    path: '/memoria',
    name: 'Memoria',
    component: () => import('../views/GameMemoria.vue')
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import('../views/UserList.vue')
  },
  {
    path: '/usuario/:id',
    name: 'Usuario',
    component: () => import('../views/Usuario.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
