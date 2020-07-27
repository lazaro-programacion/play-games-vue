<template>
  <div class="container">
    <div v-if="!usuario" class="body">...loading</div>
    <div v-else class="body">
      <picture v-if="avatar">
        <img
          class="profile-img"
          v-bind:src="avatar"
          v-bind:alt="usuario.avatar"
        />
      </picture>
      <picture v-else>
        <img
          class="profile-img"
          src="/assets/default.png"
          alt="Default avatar"
        />
      </picture>
      <h1 class="card-title">
        {{ usuario.name }}
      </h1>
      <h5>Rol: {{ usuario.rol }}</h5>
      <div class="card-body">
        <h3 class="card-text">
          {{ usuario.about ? usuario.about.state : "" }}
        </h3>
        <div class="description">
          {{ usuario.about ? usuario.about.desc : "" }}
        </div>
        <div class="scores">
          <p>Arcanoid: 58879</p>
          <p>Ahorcado: 400</p>
          <p>Animales: 230</p>
        </div>
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
      if (this.usuario.avatar) {
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
.body {
  color: black;
  height: 400px;
  width: 350px;
  padding: 20px;
  border-radius: 5px;
  background: #fffffb;
  position: relative;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  color: #222;
}
.description {
  margin-bottom: 20px;
}
.scores {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 40px);
  margin: 0 auto;
}

.scores p {
  text-align: center;
  border: solid 2px #ff6b6c;
  width: 75px;
  padding: 5px 0;
  border-radius: 5px;
}

.scores p:hover {
  background: #ff6b6c;
  color: white;
  cursor: pointer;
}

.profile-img {
  height: 100px;
  width: 100px;
  position: absolute;
  top: -25px;
  left: -25px;
  border-radius: 50%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

h1 {
  font-family: "Sriracha", arial, sans-serif;
  text-align: center;
  margin-bottom: 20px;
  color: #ffc145;
}
</style>
