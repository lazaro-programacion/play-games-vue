<template>
  <div class="container">
    <div v-if="!usuario" class="card">...loading</div>
    <div v-else class="card" style="width: 18rem;">
      <picture v-if="usuario.avatar">

      <img
        class="card-img-top"
        v-bind:src="'/assets/'+usuario.avatar"
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
        <p class="card-text">
          {{usuario.about?usuario.about.state:''}}
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
  },
  computed: {
    usuario() {
      return this.$store.state.usuarios.find((user) => 
        user.email === this.$route.params.id
      );
    },
  },
};
</script>

<style scoped>
.container {
  color: black;
}
</style>
