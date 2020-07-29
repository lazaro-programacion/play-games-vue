<template>
  <div style="display:flex;justify-content: center;">
    <div
      class="vidas"
      :class="vidas === 1 ? 'parpadea' :null"
      v-for="(item, index) in vidas"
      :key="index"
      style="padding: 18px;"
    >
      <img src="../../assets/vidas.png" alt="vidas" />
    </div>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      vidas: 5
    };
  },
  
  updated() {
    this.$emit("vidas", this.vidas);
  },

  created() {
    bus.$off('NuevaLetra')
    bus.$on("Fallo", () => {
      this.vidas--;
      if (this.vidas === 0) {
        bus.$emit("Ahorcado", "");
      }
    });

    bus.$on("Ahorcado", () => {
      this.vidas = 5;
    });
    bus.$on("PalabraCompletada", () => {
      this.vidas = 5;
    });
  },
  mounted() {
    this.$emit("vidas", this.vidas);
  }
};
</script>

<style scoped>
.vidas {
  font-size: 5rem;
}
.parpadea {
  animation-name: parpadeo;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: parpadeo;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes parpadeo {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes parpadeo {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>