<template>
  <div class="home">
    <h1>Home</h1>
    <h3>Essential Links</h3>
    <ul>
      <li><router-link to="/usuarios">Lista de usuarios</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
