<template>
  <div class="contenedor">
    <div class="p-maxima">
      <h5>NAME: {{usuario.displayName.toUpperCase()}}</h5>
      <h5 v-if="puntuacion">
        SCORE: {{puntuacion.puntuacion}}
        <span v-if=" puntuacion.puntuacion">POINTS</span>
      </h5>
    </div>
    <div class="h-score">
      <h3 class="text-center">HIGH SCORE</h3>
      <div style="display:flex" >
        <ol  class="text-center" style="color:rgb(163, 81, 0); padding: 10px;">
          NAME:
          <li v-for="(item, index) in rankin" :key="index" style="padding: 10px;">
          {{item.nombre.toUpperCase()}} 
          </li>
        </ol>
        <ol class="text-center" style="color:rgb(163, 81, 0);list-style-type:none; padding: 10px;">
          SCORE:
          <li v-for="(item, index) in rankin" :key="index" style="padding: 10px;">
            {{item.puntuacion}}
            <span v-if=" puntuacion.puntuacion">POINTS</span>
          </li>
        </ol>
      </div>
    </div>
    <h3 v-if="turnos">Turnos: {{turnos}}</h3>

    <template v-if="terminado">
      <h1 class="mi-h1 parpadea">ENHORABUENA</h1>
      <button class="btn btn-outline-info" v-on:click="createBoard">Jugar otra vez</button>
    </template>

    <div class="memory-game">
      <div class="board" :style="'grid-template-columns: repeat(' + columns + ', 150px)'">
        <div
          class="card"
          :style="'background-image: url('+fonfoCarta+')'"
          v-for="(item, index) in cards"
          :key="index"
          v-on:click="onClick(item)"
        >
          <transition name="bounce">
            <img :src="item.image" v-if="mostrar(item)" v-on:click.stop />
          </transition>
        </div>
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

<style scoped>
.card {
  width: 150px;
  height: 100px;
  background-size: cover;
  background-attachment: fixed;
  border: 2px solid;
}
.board {
  display: grid;
  gap: 20px;
}

.memory-game {
  display: flex;
  justify-content: center;
}

.card img {
  width: 100%;
  height: 100%;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.esta {
  position: fixed;
  margin-top: -385px;
  margin-left: 46px;
}
.p-maxima {
  width: 21%;
  position: absolute;
  color: rgb(163, 81, 0);
  background-color: black;
  text-align: left;
  margin-left: 21px;
 

}
.contenedor {
  font-family: "Press Start 2P", cursive;
}

.mi-h1 {
  color: rgb(0, 170, 0);
}

.h-score {
  text-align: left;
  position: fixed;
  float: right;
  margin-left: 80%;
  margin-top: -72px;

}
.h-score h3{
    color: rgb(0, 170, 0);
    padding: 10px;
}
.parpadea {
  
  animation-name: parpadeo;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name:parpadeo;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo{  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes parpadeo {  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
   100% { opacity: 1.0; }
}

@keyframes parpadeo {  
  0% { opacity: 1.0; }
   50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}
</style>