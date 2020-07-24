<template>
  <div class="palabra">
    <button @click='empezar'>Empezar</button>
    <span

      v-for="(item, index) in letras"
      :key="index"
      style="margin-right: 0.5rem;
    font-size: 3rem;"
    >{{item.visible ? item.letra: "_"}}</span>
  </div>
</template>

<script>
import bus from "./bus";
import palabras from "./array";
import _ from "lodash";

export default {
  data() {
    return {
      letras: [],
      palabra: "",
      palabrasArray: palabras
    };
  },
  /*
  watch: {
    palabra: function() {
      this.letras = this.palabra.split("").map(l => {
          console.log('letras', this.palabra)
        return { letra: l.toUpperCase(), visible: false };
      });
    }
  },
 */
  created() {
    console.log(this.palabra)
    
   
    bus.$on("Ahorcado", () => {
      this.getPalabra();
    });
    bus.$on("PalabraCompletada", () => {
      this.getPalabra();
    });
    
     
    // console.log(this.palabra)
    //  console.log(this.letras)
    bus.$on("NuevaLetra", letra => {
     
     console.log('object')
      if (this.palabra.toUpperCase().includes(letra)) {
        this.letras = this.letras.map(item => {
       return item.letra === letra
            ? { letra: item.letra, visible: true }
            : item;
        });
        if (this.letras.reduce((acc, act) => acc && act.visible, true)) {
          bus.$emit("PalabraCompletada", this.palabra);
        
        }
      } else {
        bus.$emit("Fallo", letra);
      }
    });
   
 
  },
 
beforeUpdate(){
  console.log('updated')
},

 beforeDestroy(){
    bus.$off("NuevaLetra")
    console.log('destroy')

 },

 methods: {
   empezar(){
     console.log('empezar')
     bus.$off("NuevaLetra")
      this.getPalabra()
   },
   getPalabra() {
    
      this.palabrasArray = _.shuffle(this.palabrasArray);
      this.palabra = this.palabrasArray[0]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

     console.log("palabras,", this.palabra);
      

      return  this.letras = this.palabra.split("").map(l => {
        return { letra: l.toUpperCase(), visible: false }; 
           
      });
    
     
  }
 }           
         
};
</script>

<style scoped>
.palabra {
  margin-bottom: 3rem;
}
</style>