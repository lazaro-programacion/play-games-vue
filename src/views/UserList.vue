<template>
  <div class="lista-usuarios">
    <h1>Lista de usuarios</h1>
    <ul>
      <li v-for="user in usuarios" :key="user.id">
        {{user.displayName}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
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

<style>
</style>