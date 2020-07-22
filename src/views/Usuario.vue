<template>
  <div class="container">
    <div v-if="!usuario" class="card">...loading</div>
    <div v-else class="card" style="width: 18rem;">
      <img
        class="card-img-top"
        v-bind:src="'/assets/'+usuario.avatar"
        v-bind:alt="usuario.avatar"
      />
      <div class="card-body">
        <h5 class="card-title">
          {{ usuario.name }} | <span>Rol: {{ usuario.rol }}</span>
        </h5>
        <p class="card-text">
          {{usuario.about.state}}
        </p>
        <h5>Mejores puntuaciones</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Arcanoid: 58879 pts.</li>
          <li class="list-group-item">Ahorcado: 400 pts.</li>
          <li class="list-group-item">Animales: 230 pts.</li>
        </ul>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Usuario",
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

    // this.usuario=this.$store.state.usuarios.find(
    //     (user) => user.email === this.$route.params.id
    //   );
  },
  mounted() {
    //console.log("usuario montado", this.usuario.name);
  },
  computed: {
    usuario() {
      const usu = this.$store.state.usuarios.find((user) => 
        user.email === this.$route.params.id
      );
      return usu;
    },
  },
};
</script>

<style scoped>
.container {
  color: black;
}
</style>
