<template>
  <div>
    <div style="color:rgb(0,170,0)">
      Letras:
      <input type="text" v-model="letras" v-on:keyup="onLetra($event)" />
    </div>
  </div>
</template>

<script>
import bus from "./bus";

export default {
  data() {
    return {
     letras: ""
    };
  },
  methods: {
    onLetra(event) {
     console.log(event.key);
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
  }
};
</script>

<style>
</style>