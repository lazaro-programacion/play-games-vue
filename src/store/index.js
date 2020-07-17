import Vue from "vue";
import Vuex from "vuex";
import { auth, db } from "../firebase";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    listaUsuarios: [],
    usuarios:[]
  },

  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
      localStorage.setItem('usuario', JSON.stringify(state.usuario));
    },
  
    setError(state, payload) {
      state.error = payload;
    },

    setlistaUsuarios(state, payload){
      state.listaUsuarios = payload
    },

    setUsers(state, usuarios){
      state.usuarios = usuarios;
    }

  },
  actions: {
    getUsers({commit}){
      db.collection('usuarios').get().then(
       res=> {
         const docsUsers=res.docs.map(
           item=>{
             const data=item.data();
             return{
               id: item.id,
               displayName: data.displayName,
               rol: item.rol
             }
            }
         )
         console.log('Users',docsUsers);
         commit('setUsers', docsUsers)
       }
      )

    },
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
    
    crearUsuario({ commit }, usuario) {
      auth
        .createUserWithEmailAndPassword(usuario.email, usuario.pass1)
        .then((res) => {
          const usuarioCreado = {
            displayName: usuario.nombre,
            email: res.user.email,
            uid: res.user.uid,
        //    pass1: usuario.pass1,
            rol: usuario.rol,
          };

          db.collection("usuarios")
            .add(usuarioCreado)
            .then(console.log("subido correctamente"));

          db.collection("usuarios")
            .get()
            .then((res) => {
              let usuarioBuscado = "";

              res.forEach((doc) => {
                if (doc.data().email === usuarioCreado.email) {
                  usuarioBuscado = doc.data();
                  usuarioBuscado.id = doc.id;
                  commit("setUsuario", usuarioBuscado);
                  router.push("/");
                }
              });
            });
        })
        .catch(function(error) {
          commit("setError", error);
          console.log(error);
        });
    },
    ingresoUsuario({ commit }, usuario) {
      auth
        .signInWithEmailAndPassword(usuario.email, usuario.pass1)
        .then((res) => {
          console.log("respuesta", res);
          const usuarioLogeado = {
            email: res.user.email,
            uid: res.user.uid,
          };

          db.collection("usuarios")
            .get()
            .then((res) => {
              let usuarioBuscado = "";

              res.forEach((doc) => {
                if (doc.data().email === usuarioLogeado.email) {
                  usuarioBuscado = doc.data();
                  usuarioBuscado.id = doc.id;
                  commit("setUsuario", usuarioBuscado);
                  router.push("/");
                }
              });
            });
        })
        .catch(function(error) {
          commit("setError", error);
          console.log(error);
        });
    },
    cerrarSesion() {
      auth.signOut().then((res) => {
        router.push("/login");
        localStorage.removeItem('usuario') //limia el localstore usuario

    //  localStorage.clear() // esto lo borra todo
        console.log("cerrarSesion", res);
      });
    },
    detectarUsuario({ commit }, usuario) {
      commit("setUsuario", usuario);
    },
  },
  modules: {},
});
