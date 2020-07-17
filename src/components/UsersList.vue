<template>
<div>
  <h1>lista usuarios component</h1>

</div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: 'UsersList',
  data() {
    return {
      users: [],
    };
  },
  created() {
    
  },
  mounted() {
      console.log('users',this.getUsers());
  },
  methods: {
      ...mapActions(['getUsers'])

  },
};
</script>

<style></style>
