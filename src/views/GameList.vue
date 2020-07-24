<template>
  <div class="container">
    <h1>Lista de Juegos disponibles</h1>
    <ul>
        <li><router-link to="/juego-palabras"><button type="button" class="btn btn-info" active-class="active">Palabras encadenadas</button></router-link></li>
        <li><router-link to="/ahorcado"><button type="button" class="btn btn-info" active-class="active">Ahorcado</button></router-link></li>
        <li><router-link to="/memoria"><button type="button" class="btn btn-info" active-class="active">Memoria</button></router-link></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
li{
  list-style:none;
  margin: 10px;
}
</style>