import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {auth} from './firebase'

// para que funcione boostrap-vue
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use( require ('vue-moment') )
 
 Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

const vueObject =
 new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


auth.onAuthStateChanged(user => {
  if(user){

   // user = JSON.parse(localStorage.getItem('usuario' ))
   console.log('existe usuario',user)

    store.dispatch('detectarUsuario', user)
  }else{
    console.log(' no existe usuario',user)
    store.dispatch('detectarUsuario',user)

  }
  vueObject
})


