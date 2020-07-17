import Vue from "vue";
import Vuex from "vuex";
import { auth, db } from "../firebase";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
  },

  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
      localStorage.setItem('usuario', JSON.stringify(state.usuario));
    },

  
    setError(state, payload) {
      state.error = payload;
    },

  },
  actions: {
    
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
