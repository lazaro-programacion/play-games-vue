<template>
  <div class="home">
    <div class="container1">
      <div>
        <b-card
          title="Palabras encadenadas"
          img-src='https://lh3.googleusercontent.com/wyObs46fr74K4EfEla_4SfJve42Lxm_rzVn5bjY-IGA3H5ux5AfquXqVIXIA-_gnteI'
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
          bg-variant="dark"
        >
          <b-card-text>Palabras encadenadas. Pon a prueba tu cerebro.</b-card-text>
          <b-button variant="primary">
            <router-link to="/juego-palabras">PLAY NOW</router-link>
          </b-button>
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
          <b-button variant="primary">
            <router-link to="/ahorcado">PLAY NOW</router-link>
          </b-button>
        </b-card>
      </div>
      <div>
        <b-card
          title="Memory Game"
          img-src="https://i.ibb.co/6XkXKRP/memori.png"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
          bg-variant="dark"
        >
          <b-card-text>Juego para poner a prueba tu memoria</b-card-text>
          <b-button variant="primary">
            <router-link to="/memoria">PLAY NOW</router-link>
          </b-button>
        </b-card>
      </div>
    </div>
    
  </div>
</template>
<script>

// import { mapState} from "vuex";
// import { db } from "../firebase";
//import store from "../store";
export default {
  data() {
    return {
      
    };
  },
 
  props: {
    
  },
  computed: {

  },
  methods: {

 
  },
  created() {
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container1 {
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 5px;
}
body {
  padding: 1rem;
}
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