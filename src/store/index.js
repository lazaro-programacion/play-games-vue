import Vue from "vue";
import Vuex from "vuex";
import { auth, db } from "../firebase";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
    puntuacion: {
      puntuacion: null,
      nombre: null,
      id: null,
    },
    rankin: [],
    error: null,
    usuarios:[],
    usersPoints:[],
  },

  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
      localStorage.setItem("usuario", JSON.stringify(state.usuario));
    },
    setRankin(state, payload) {
      state.rankin = payload;
    },
    setPuntuacion(state, payload) {
      state.puntuacion = payload;
      localStorage.setItem("puntuacion", JSON.stringify(state.puntuacion));
    },
    setError(state, payload) {
      state.error = payload;
    },
    setUsers(state, usuarios){
      state.usuarios = usuarios;
    },
    setUsersPoints(state, usersPoints){
      state.usersPoints=usersPoints;
    }

  },
  getters:{
    getUsers(state){
      return state.usuarios;
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
               email: item.id,
               name: data.displayName,
               about:data.about,
               rol: data.rol,
               avatar: data.avatar
             }
            }
         )
         console.log('Users',docsUsers);
         commit('setUsers', docsUsers)
       }
      )
    },
    getPuntos({commit}){
      db.collection('puntMemori').get().then(
        res=>{
          const docsPuntos=res.docs.map(
            item=>{
              const data=item.data();
              return {
                puntuacion: data.puntuacion,
                email: item.id,
                nombre:data.nombre
              }
            }
          );
          console.log('puntos', docsPuntos);
          commit('setUsersPoints',docsPuntos);
        }
      )
    },
    crearUsuario({ commit }, usuario) {
      auth
        .createUserWithEmailAndPassword(usuario.email, usuario.pass1)
        .then((res) => {
          const usuarioCreado = {
            displayName: usuario.nombre,
            email: res.user.email,
            uid: res.user.uid,
            rol: usuario.rol

          };
          const puntua = {
            puntuacion: null,
            nombre: usuario.nombre,
            email: res.user.email,
            data: new Date()
          };

          db.collection("usuarios")
            .doc(usuarioCreado.email)
            .set(usuarioCreado)
            .then(console.log("creado correctamente"));

          db.collection("usuarios")
            .get()
            .then((res) => {
              let usuarioBuscado = "";

              res.forEach((doc) => {
                if (doc.data().email === usuarioCreado.email) {
                  usuarioBuscado = doc.data();
                  usuarioBuscado.id = doc.id;
                  commit("setUsuario", usuarioBuscado);
                }
              });
            });
          db.collection("puntMemori")
            .doc(res.user.email)
            .set(puntua)
            .then(console.log("puntMemori correctamente"));
        })
        .catch(function(error) {
          commit("setError", error);
          console.log(error);
        });
      router.push("/");
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
        localStorage.removeItem("usuario");
        localStorage.removeItem("puntuacion"); //limia el localstore usuario

        //  localStorage.clear() // esto lo borra todo
        console.log("cerrarSesion", res);
      });
    },
    detectarUsuario({ commit }, usuario) {
      usuario = JSON.parse(localStorage.getItem("usuario"));
      commit("setUsuario", usuario);
    },
    detectarPuntacion({ commit }, puntuacion) {
      commit("setPuntuacion", puntuacion);
    },
    puntPuntuacion({ commit }) {
      const user = JSON.parse(localStorage.getItem("usuario"));
      db.collection("puntMemori")
        .doc(user.email)
        .get()
        .then((res) => {
          console.log("si existe", res.data().puntuacion);

          const punt = res.data();
          commit("setPuntuacion", punt);
        })
        .catch(function(error) {
          commit("setError", error);
          console.log("no entra", error);
        });
    },
    rankingTop({ commit }) {
      let ref = db
        .collection("puntMemori")
        .where('puntuacion', '>', 0)
        .orderBy("puntuacion", "asc")
        .limit(10);

        console.log('ref', ref)

      ref.onSnapshot((querySnapshot) => {
        this.rankin = [];

        querySnapshot.forEach((doc) => {
          this.rankin.push(doc.data());
        });
        commit("setRankin", this.rankin),
          console.log("todo correcto", this.rankin);
      });
    },
  },
  modules: {},
});
