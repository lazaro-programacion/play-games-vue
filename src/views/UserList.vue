<template>
  <div class="lista-usuarios container">
    <h1>Lista de usuarios</h1>
    <table class="table table-hover table-dark">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre:</th>
      <th scope="col">Rol</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(user, index) in usuarios" :key="index">
      <th scope="row">{{user.id}}</th>
      <td>{{user.displayName}}</td>
      <td>{{user.rol}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  name: 'UserList',
    async created() {
      try {
        await this.$store.dispatch('getUsers');
      } catch (error) {
        console.error(error);
      }  
    },
    computed: {
      usuarios(){
        return this.$store.state.usuarios
      }
    },
};
</script>

<style scopped> 
.container{
  max-width: 40em;
}
</style>