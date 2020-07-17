import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    listaUsuarios: []
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setlistaUsuarios(state, payload){
      state.listaUsuarios = payload
    },
  },
  actions: {
    getUsuarios({commit}){
      const listUsers = []
      db.collection('usuarios').get()
        .then(res =>{
          console.log(res.docs)
          res.forEach(doc => {
            console.log(doc.id)
            console.log(doc.data())
            let user = doc.data()
            user.id = doc.id
            listUsers.push(user)
           })
         commit('setlistaUsuarios', listUsers)
        })
    },
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
    }
  },
  modules: {
  }
})
