<template>
  <div class="home">
    <div class="container1">
      <div>
        <b-card
          title="Palabras encadenadas"
          img-src="https://i.ibb.co/qgLjfDj/palabrasencadenadas.png"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
          bg-variant="dark"
        >
          <b-card-text>Palabras encadenadas. Pon a prueba tu cerebro.</b-card-text>
          
            <router-link to="/juego-palabras"><b-button variant="primary">PLAY NOW</b-button></router-link>
          
        </b-card>
      </div>
      <div>
        <b-card
          title="Ahorcado"
          img-src="https://th.bing.com/th/id/OIP.1PlM-x5xpO6_81-V56uvLwHaEK?w=281&h=180&c=7&o=5&pid=1.7"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
          bg-variant="dark"
        >
          <b-card-text>No te ahorques. Pon a prueba tu pericia.</b-card-text>
          <b-button to="/ahorcado" variant="primary">PLAY NOW</b-button>
        </b-card>
      </div>
      <div>
        <b-card
          title="Memory Game"
          img-src="https://i.ibb.co/6XkXKRP/memori.png"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 26rem;"
          class="mb-2"
          bg-variant="dark"
        >
          <b-card-text>Juego para poner a prueba tu memoria</b-card-text>
          <b-button href="/memoria" variant="primary">PLAY NOW</b-button>
          <hr style="background-color: white;">
          <div class="h-score">
      <h3 class="text-center">HIGH SCORE</h3>
      <div style="display:flex" v-if="puntuacion" >
        <ul  class="text-center" style="color:rgb(163, 81, 0); padding: 10px;">
          NAME:
          <hr>
          <li v-for="(item, index) in rankin" :key="index" style="padding: 10px;">
          {{item.nombre.toUpperCase()}} 
          </li>
        </ul>
        <ol  class="text-center" style="color:rgb(163, 81, 0); padding: 10px;list-style-type: none">
          SCORE:
           <hr>
          <li v-for="(item, index) in rankin" :key="index" style="padding: 10px;">
            {{item.puntuacion}}
            <span >POINTS</span>
          </li>
        </ol>
      </div>
    </div>
        </b-card>
        
      </div>
    </div>
    
  </div>
</template>
<script>

import { mapState } from "vuex";
//import store from "../store";
export default {
  computed: {
    ...mapState(['puntuacion','rankin'])
  },
  }
 
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container1 {
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 100px;
}
body {
  padding: 1rem;
}
h3 {
  margin: 40px 0 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.p-maxima {
  width: 21%;
  position: absolute;
  color: rgb(163, 81, 0);
  background-color: black;
  text-align: left;
  margin-left: 100px;
}
.h-score {
  text-align: left;
  position: fixed;
  position: initial;
  float: right;
  margin-left: 80%;
  margin-left: 0%;
  margin-right: -2%;
  margin-top: -10px;
  font-family: "Press Start 2P", cursive;
}
.h-score h3{
    color: rgb(0, 170, 0);
    padding: 10px;
    font-family: "Press Start 2P", cursive;
  
}
</style>