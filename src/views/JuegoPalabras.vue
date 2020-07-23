<template>
  <div class="container mt-2">
   <div  class="mi-imagen container">
    
   </div>
    
    <b-button id="show-btn" class='m-5' @click="$bvModal.show('bv-modal-example')">Ver instrucciones</b-button>

      <b-modal id="bv-modal-example" hide-footer>
        <template v-slot:modal-title>
          Instrucciones <code>Palabras encadenadas</code> juego:
        </template>
        <div class="d-block text-center">
          <h3>El juego consite en encadenar palabras, debe de coincidir la ultima letra de la palabra actual
            con la primera letra de la nueva palabra, sino coincide terminara el juego </h3>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Volver</b-button>
      </b-modal>
    <template v-if="!estado.comenzado">
      <div class="alert alert-danger" role="alert" v-if="estado.error">{{estado.error}}</div>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        v-on:click="estado.comenzado = true"
      >Comenzar</button>
    </template>
    <template v-else>
      <div>Puntuacion actual: {{palabras.length}}</div>
      <addPalabra v-bind:palabras="palabras" v-bind:estado="estado"></addPalabra>

      <listaPalabras v-bind:palabras="palabras" />
    </template>
  </div>
</template>

<script>
import ListaPalabras from "../components/juego-palabras/ListaPalabras";
import AddPalabra from "../components/juego-palabras/AddPalabra";
// https://lh3.googleusercontent.com/wyObs46fr74K4EfEla_4SfJve42Lxm_rzVn5bjY-IGA3H5ux5AfquXqVIXIA-_gnteI
export default {
  name:'JuegoPalabras',
  components: {
    listaPalabras: ListaPalabras,
    addPalabra: AddPalabra
  },
  data() {
    return {
      palabras: [],
      estado: {
        comenzado: false,
        error: null
      }
    };
  }
};
</script>

<style scoped>
.mi-imagen{
  background-image: url('https://lh3.googleusercontent.com/wyObs46fr74K4EfEla_4SfJve42Lxm_rzVn5bjY-IGA3H5ux5AfquXqVIXIA-_gnteI');
      height: 251px;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    background-size: 47%;
}
</style>