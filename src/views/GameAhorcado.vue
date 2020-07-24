<template>
  <div class="container contain">
    <h1>Ahorcado</h1>
    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>
        Instrucciones
        <code>El AHorcado</code> juego:
      </template>
      <div class="d-block text-center">
        <h3>Trata de adivinar la palabra al preguntar las letras que contiene. Sin embargo, cada respuesta incorrecta te acerca un poco más a perder.</h3>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Voler</b-button>
    </b-modal>
    <div  v-if="visto && !perdido" class="img-instrucciones" style="display:flex;  flex-wrap: wrap; width: 120%;">
      <img v-if="vida === 5" src="../assets/ahoracado1.webp" alt />
      <img v-if="vida === 4" src="../assets/ahorcado2.webp" alt />
      <img v-if="vida === 3" src="../assets/ahorcado3.webp" alt />
      <img v-if="vida === 2" src="../assets/ahorcado4.webp" alt />
      <img v-if="vida === 1" src="../assets/ahorcado5.webp" alt />

      <b-row align-h="center">
        <b-col cols="12">
          <b-card
            img-src="https://th.bing.com/th/id/OIP.1PlM-x5xpO6_81-V56uvLwHaEK?w=281&h=180&c=7&o=5&pid=1.7"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-button
              id="show-btn"
              @click="$bvModal.show('bv-modal-example')"
              variant="primary"
            >ver instrucciones</b-button>
                <button @click="empezarPartida">
                Empezar partida
                </button>

          </b-card>
        </b-col>
      </b-row>

  
    
    </div>
      <contadorVictorias />
  <vidas v-if="visto && !perdido"  @vidas="vida = $event" />
    <palabra v-if="visto && !perdido" :palabra="palabra" />
    <letras v-if="visto && !perdido" :palabra="palabra" />
    <img  v-if="!visto" src="https://i.pinimg.com/originals/9a/f1/4e/9af14e0ae92487516894faa9ea2c35dd.gif" alt="imagen-win">
    <img v-if="perdido" src="https://media1.tenor.com/images/b9d3d8e8d39450995da1955b14b8f210/tenor.gif?itemid=12159885" alt="asd">
  </div>
</template>

<script>
import Vidas from "../components/ahorcado/Vidas";
import Letras from "../components/ahorcado/Letras";
import Palabra from "../components/ahorcado/Palabra";
import ContadorVictorias from "../components/ahorcado/ContadorVictorias";
import bus from "../components/ahorcado/bus";
import palabras from "../components/ahorcado/array";
import _ from "lodash";

export default {
  name: "Ahorcado",
  components: {
    letras: Letras,
    palabra: Palabra,
    vidas: Vidas,
    contadorVictorias: ContadorVictorias
  },
  data() {
    return {
      palabra: "",
      palabrasArray: palabras,
      vida: null,
      visto: true,
      perdido: false
    };
  },
  methods: {
    getPalabra() {
      this.palabrasArray = _.shuffle(this.palabrasArray);
      this.palabra = this.palabrasArray[0]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
            console.log("palabras2,", this.palabra);

      return this.palabra;
      /*  axios
        .get("https://www.aleatorios.com/random-words?dictionary=2&words=1")
        .then(
          res =>{
            console.log( res.data.records[0] , 'repuesta')
            this.palabra = res.data.records[0]
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")}
        ); */
    },
     empezarPartida(){
       
       this.getPalabra();
    } 
  },
 
 
  created() {

    bus.$on("Ahorcado", () => {
      this.perdido = true
      setTimeout(() => { this.getPalabra(); 
       this.perdido = false
      }, 2500);
    });
   
    bus.$on("PalabraCompletada", () => {
         this.visto = false
      setTimeout(() => { this.getPalabra(); 
       this.visto = true
      }, 2500);
         
      
     
    });

  }
};
</script>

<style scope>
.contain {
  font-family: "Press Start 2P", cursive;
}
.img-instrucciones {
  display: flex;
  justify-content: flex-end;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: 179px;
}
</style>