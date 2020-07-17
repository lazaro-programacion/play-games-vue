<template>
  <div class="ahorcado-container">
    <h1>Ahorcado</h1>
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
.ahorcado-container {
  display: grid;
}
</style>