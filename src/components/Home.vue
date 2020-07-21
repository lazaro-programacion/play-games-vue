<template>
  <div class="home">
    <div class="container1">
      <div>
        <b-card
          title="Palabras encadenadas"
          img-src="https://lh3.googleusercontent.com/wyObs46fr74K4EfEla_4SfJve42Lxm_rzVn5bjY-IGA3H5ux5AfquXqVIXIA-_gnteI"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
          bg-variant="dark"
        >
          <b-card-text>Palabras encadenadas. Pon a prueba tu cerebro.</b-card-text>

          <b-button href="/juego-palabras" variant="primary">PLAY NOW</b-button>
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

          <b-button href="/ahorcado" variant="primary">PLAY NOW</b-button>
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

          <b-button href="/memoria" variant="primary">PLAY NOW</b-button>
        </b-card>
      </div>
    </div>

    <div class="h-score">
      <h3 class="text-center">HIGH SCORE</h3>
      <div style="display:flex" >
        <ol  class="text-center" style="color:rgb(163, 81, 0); padding: 10px;">
          NAME: <hr>
          <li v-for="(item, index) in rankin" :key="index" style="padding: 10px;">
          {{item.nombre.toUpperCase()}} 
          </li>
        </ol>
        <ol class="text-center" style="color:rgb(163, 81, 0); padding: 10px;">
          SCORE: <hr>
          <li v-for="(item, index) in rankin" :key="index" style="padding: 10px;">
            {{item.puntuacion}}
            <span v-if=" puntuacion.puntuacion">POINTS</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { UNSPLASH_APPLICATION, UNSPLASH_SECRET } from "../config/unsplash.js";
import _ from "lodash";
import { mapState, mapActions } from "vuex";
import { db } from "../firebase";
//import store from "../store";

export default {
  data() {
    return {
      cards: [],
      element1: null,
      element2: null,
      turnos: 0,
      fonfoCarta: null
      
    };
  },
  watch: {
    columns: function() {
      this.createBoard();     
    },
    terminado: function(value) {
      this.puntPuntuacion();

      if (value) {
        const user = JSON.parse(localStorage.getItem("usuario"));
        const publica = {
          puntuacion: this.turnos,
          id: user.id,
          nombre: user.displayName,
          email: user.email,
          data: new Date()
        };
        const pun = JSON.parse(localStorage.getItem("puntuacion"));

        if (!pun) {
          db.collection("puntMemori")
            .doc(user.email)
            .set(publica)
            .then(
              console.log("subido correctamente", this.turnos),
              console.log("punt1", this.puntuacion)
            );
        } else {
          if (this.turnos <= pun.puntuacion || pun.puntuacion === null) {
            db.collection("puntMemori")
              .doc(user.email)
              .set(publica)
              .then(
                console.log("subido correctamente", this.turnos),
                console.log("punt1", this.puntuacion)
              );
          } else {
            console.log("no se a grabado");
          }
        }
      } else {
        console.log("estas muy fuera");
      }
    }
  },
  props: {
    columns: {
      type: Number,
      default: 4
    }
  },
  computed: {
    elements() {
      return this.columns ** 2 % 2 === 1
        ? (this.columns * (this.columns - 1)) / 2
        : this.columns ** 2 / 2;
    },
    terminado() {
      return this.cards.reduce((acc, act) => acc && act.discovered, true);
    },
    ...mapState(["puntuacion", "usuario","rankin"])
  },
  methods: {
    async createBoard() {
      let res = await axios.get(
        `https://api.unsplash.com/photos/random?count=${this.elements}&query=bikini&client_id=${UNSPLASH_APPLICATION}&client_secret=${UNSPLASH_SECRET}`
      );
      let respuesta = await axios.get(
        `https://api.unsplash.com/photos/random?count=1&query=bikini&client_id=${UNSPLASH_APPLICATION}&client_secret=${UNSPLASH_SECRET}`
      );

      this.fonfoCarta = respuesta.data[0].urls.thumb;

      this.cards = [];
      res.data.forEach(i => {
        this.cards.push({
          image: i.urls.thumb,
          discovered: false
        });
        this.cards.push({
          image: i.urls.thumb,
          discovered: false
        });
      });
      this.cards = _.shuffle(this.cards);
      this.turnos = 0;
    },
    mostrar(item) {
      return (
        item.discovered || item === this.element1 || item === this.element2
      );
    },
    onClick(item) {
      if (!this.element1) {
        this.element1 = item;
      } else {
        if (!this.element2) {
          this.element2 = item;
          if (this.element1.image === this.element2.image) {
            this.element1.discovered = true;
            this.element2.discovered = true;
          }
          this.turnos++;
        } else {
          this.element1 = item;
          this.element2 = null;
        }
      }
    },
    ...mapActions(["puntPuntuacion", "detectarUsuario", "detectarPuntacion"])
  },
  created() {
    if(!this.puntuacion || this.displayName){
        this.detectarPuntacion();
     console.log('ranking',this.rankin);
 /*    if (!this.puntacion) {
      const user = JSON.parse(localStorage.getItem("usuario"));
      const puntua = {
        puntuacion: 0,
        nombre: user.displayName,
        email: user.email,
        data: new Date()
      };
      const pun = localStorage.setItem("puntuacion", puntua);
      console.log("pun", pun);
      store.dispatch("detectarPuntacion", pun);
    } */

    this.detectarUsuario();
   
    }
  this.createBoard();
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

.p-maxima {
  width: 21%;
  position: absolute;
  color: rgb(163, 81, 0);
  background-color: black;
  text-align: left;
  margin-left: 21px;
}


.h-score {
  text-align: left;
  position: initial;
  float: right;
  margin-left: 0%;
  margin-right: 75%;
  margin-top: -10px;
  font-family: "Press Start 2P", cursive;

}
.h-score h3{
    color: rgb(0, 170, 0);
    padding: 10px;
    font-family: "Press Start 2P", cursive;
}

</style>
