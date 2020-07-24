<template>
  <div id="app ">
    <img class="col-6 md-12" src='../assets/memori.png' alt />
    <div>
      Nivel de Dificultad:
      <select v-model="ncols" >
        <option value="3" >FACIL</option>
        <option value="4">NORMAL</option>
        <option value="5">DIFICIL</option>
        <option value="6">EXPERTO</option>
        <option value="7">DIOS</option>
      </select>
    </div>
    <memory-game :columns="parseInt(ncols)"  />
  </div>
</template>

<script>
import memoryGame from "../components/MemoryGame";

export default {
  name: "GameMemory",
  data() {
    return {
      ncols: 4

    };
  },
  created() {
    console.log('created')
  },
  components: {
    memoryGame
  }
};
</script>

<style>
</style>