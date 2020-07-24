<template>
  <div class="container">
    <div v-if="!usuario" class="card">...loading</div>
    <div v-else class="card" style="width: 18rem;">
      <picture v-if="avatar">
        <img
          class="card-img-top"
          v-bind:src="avatar"
          v-bind:alt="usuario.avatar"
        />
      </picture>
      <picture v-else>
        <img
          class="card-img-top"
          src="/assets/default.png"
          alt="Default avatar"
        />
      </picture>
      <div class="card-body">
        <h5 class="card-title">
          {{ usuario.name }} | <span>Rol: {{ usuario.rol }}</span>
        </h5>
        <h3 class="card-text">
          {{ usuario.about ? usuario.about.state : "" }}
        </h3>
        <p class="card-text">
          {{ usuario.about ? usuario.about.desc : "" }}
        </p>

        <h5>Mejores puntuaciones</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Arcanoid: 58879 pts.</li>
          <li class="list-group-item">Ahorcado: 400 pts.</li>
          <li class="list-group-item">Animales: 230 pts.</li>
        </ul>
        <button v-if="autUser()" class="btn btn-primary" @click="editUser">
          Editar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index";
import firebase from "firebase";

export default {
  name: "Usuario",
  data() {
    return {
      loggedUser: "",
      avatar: "",
    };
  },
  async created() {
    window.scrollTo(0, 0);
    try {
      await this.$store.dispatch("getUsers");
    } catch (error) {
      console.error(error);
    }

    try {
      this.$store.dispatch("getPuntos");
    } catch (error) {
      console.error(error);
    }

    this.loggedUser = JSON.parse(localStorage.getItem("usuario"));
    this.getAvatar();
  },
  computed: {
    usuario() {
      return this.$store.state.usuarios.find(
        (user) => user.email === this.$route.params.id
      );
    },
  },
  methods: {
    getAvatar() {
      const sto = firebase.storage();
      const pathRef = sto.ref("avatars");
      if(this.usuario.avatar){
        pathRef
          .child(this.usuario.avatar)
          .getDownloadURL()
          .then((url) => (this.avatar = url))
          .catch((error) => console.log(error));

      }
    },
    autUser() {
      console.log("usuario log", this.loggedUser.email);
      return this.usuario.email === this.loggedUser.email;
    },
    editUser() {
      router.push({ path: `/avatar-upload` });
    },
  },
};
</script>

<style scoped>
.container {
  color: black;
}
</style>
