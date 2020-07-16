<template>
  <h1>lista usuarios component</h1>
</template>

<script>

export default {
    name: 'UsersList',
  data() {
    return {
      users: [],
    };
  },
  mounted() {},
  methods: {
    fetchUsers() {
      this.users = this.$store
        .collection("usuarios")
        .then((result) => {
          console.log("results", result);
        })
        .catch((err) => {
          console.log("error", err);
        });
        console.log('users',users);
    },
  },
};
</script>

<style></style>
