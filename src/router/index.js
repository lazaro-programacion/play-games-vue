import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '../firebase'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/juegos',
    name: 'Juegos',
    component: () => import('../views/GameList.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import('../components/UsersList.vue')
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

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    const usuario = auth.currentUser
    console.log('usuario desde router ', usuario)

    if (!usuario) {
      next({ path: '/login'})
    }else{
      next()
    }
  }else {
    next()
  }
})
export default router
