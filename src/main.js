import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {auth} from './firebase'

// para que funcione boostrap-vue
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

auth.onAuthStateChanged(user => {
  if(user){
 
    user = JSON.parse(localStorage.getItem('usuario' ))
   console.log('existe usuario',user)
  /*   const detectaUsuario = {
      rol: store.state.usuario.rol,
      email: user.email,
      uid: user.uid
    } */
    store.dispatch('detectarUsuario', user)
  }else{
    console.log(' no existe usuario',user)
    store.dispatch('detectarUsuario',user)

  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
