import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    users: null
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setUsers(state, payload){
      state.users = payload
    }
  },
  actions: {
    crearUsuario({commit}, usuario){
      auth.createUserWithEmailAndPassword(usuario.email, usuario.pass1)
      .then(
        res => {
        const usuarioCreado = {
          displayName: usuario.nombre,
          email: res.user.email,
          uid: res.user.uid,
          rol: usuario.rol
        }

        db.collection('usuarios').add(usuarioCreado).then(
          console.log('subido correctamente')
        )
          console.log('que me traigo',res)
          commit('setUsuario',usuarioCreado)
          router.push('/')
          console.log('cuando lo creamos',this.usuario);
        } ,
        
      ).catch(function(error) {

        commit('setError',error)
       console.log(error)
      });
    },
    getUsuarios({commit}){
      db.collection('usuarios').get().then(
        res=> {
          console.log(res)
          commit('setUsers', res);
        }
      )
    }
  },
  modules: {
  }
})
