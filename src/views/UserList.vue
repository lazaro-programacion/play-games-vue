<template>
  <div class="container">
    <div class="lista-usuarios">
      <div class="card" style="width: 30rem;">
        <h1 class="card-title">Lista de usuarios</h1>
        <table class="table table-hover table-dark">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre:</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in usuarios"
              :key="index"
              @click="onClickUser(user)"
            >
              <td scope="row">{{ user.email }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.rol }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="side">
      <div class="max-puntuacion">
        <p>puntuaciones máximas</p>
      </div>
      <div class="ultimas-puntuaciones">
        <p>últimas puntuaciones</p>

      </div>
    </div>

  </div>
</template>

<script>
import router from "../router/index";
export default {
  name: "UserList",
  async created() {
    try {
      await this.$store.dispatch("getUsers");
    } catch (error) {
      console.error(error);
    }
    
    try {
      await this.$store.dispatch("getPuntos");
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    usuarios() {
      return this.$store.state.usuarios;
    },
    puntos(){
      return this.$store.state.usersPoints;
    }
  },
  methods: {
    onClickUser(user) {
      router.push({ path: `/usuario/${user.email}` });
    },
  },
};
</script>

<style scoped>
.container {
  color: black;
  display: grid;
  grid-template-columns: 50% 50%;
}

.side{
  color: aliceblue;
  border: solid red;
}

.side>div{
  border: solid red;

}
</style>
