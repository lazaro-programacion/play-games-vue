<template>
  <div>
    <div style="color:rgb(0,170,0)">
      Letras:
      <input v-if="palabra"  type="text" v-model="letras" v-on:keyup="onLetra($event)" autofocus />
    </div>
  </div>
</template>

<script>
import bus from "./bus";

export default {
  data() {
    return {
     letras: ""
    }
  },
  
   props: {
    palabra: {
      type: String
    }
  },
  methods: {
    onLetra(event) {
      bus.$emit("NuevaLetra", event.key.toUpperCase());
    }
  },
  created() {
   // console.log(this.letras)
    bus.$on("Ahorcado", () => {
    this.letras = "";

    });
    bus.$on("PalabraCompletada", () => {
    this.letras = "";

    });
  },
  
};
</script>

<style>
</style>