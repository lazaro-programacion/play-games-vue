<template>
  <div class="container">
    <h1>Ahorcado</h1>
    <b-modal id="bv-modal-example" hide-footer>
    <template v-slot:modal-title>
      Instrucciones <code>El AHorcado</code> juego:
    </template>
    <div class="d-block text-center">
      <h3>Trata de adivinar la palabra al preguntar las letras que contiene. Sin embargo, cada respuesta incorrecta te acerca un poco más a perder. </h3>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Voler</b-button>
    </b-modal>
    <b-row align-h="center">
        <b-col cols="4">
            <b-card
              title="Card Title"
              img-src="https://th.bing.com/th/id/OIP.1PlM-x5xpO6_81-V56uvLwHaEK?w=281&h=180&c=7&o=5&pid=1.7"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </b-card-text>

              <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')" variant="primary">ver instrucciones</b-button>
            </b-card>
        </b-col>
    </b-row>
     
    <contadorVictorias />
    <vidas />
    <palabra :palabra="palabra" />
    <letras />
  </div>
</template>

<script>
import Vidas from "../components/ahorcado/Vidas";
import Letras from "../components/ahorcado/Letras";
import Palabra from "../components/ahorcado/Palabra";
import ContadorVictorias from "../components/ahorcado/ContadorVictorias";
import axios from "axios";
import bus from "../components/ahorcado/bus";
export default {
  name:'Ahorcado',
  components: {
    letras: Letras,
    palabra: Palabra,
    vidas: Vidas,
    contadorVictorias: ContadorVictorias
  },
  data() {
    return {
      palabra: ""
    };
  },
  methods: {
    getPalabra() {
      axios
        .get("https://www.aleatorios.com/random-words?dictionary=2&words=1")
        .then(
          res =>{
            console.log( res.data.records[0] , 'repuesta')
            this.palabra = res.data.records[0]
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")}
        );
    }
  },
  created() {
    this.getPalabra();
    bus.$on("Ahorcado", () => {
      this.getPalabra();
    });
    bus.$on("PalabraCompletada", () => {
      this.getPalabra();
    });
  }
};
</script>

<style>

</style>