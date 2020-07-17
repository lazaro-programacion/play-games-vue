import { mapActions, mapState } from 'vuex';
<template>
  <div class="lista-usuarios">
    <h1>Lista de usuarios</h1>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    data() {
        return {
          items:[]
          /*
            items: [
          { first_name: 'Dickerson', last_name: 'Macdonald', score: 10000 },
          { first_name: 'Larsen', last_name: 'Shaw', score: 9000 },
          { first_name: 'Geneva', last_name: 'Wilson', score: 8000 },
          { first_name: 'Jami', last_name: 'Carney', score: 7000 }
        ]*/
        }
    },
    mounted() {
      this.getUsuarios()
      console.log('usuarios',this.listaUsuarios)
    },
    methods: {
      ...mapActions(['getUsuarios'])
    },
  computed: {
    ...mapState(['listaUsuarios'])
  },
};
</script>

<style>
</style>