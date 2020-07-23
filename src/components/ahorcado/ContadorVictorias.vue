<template>
  <div class="vic-der">
    <ul>
      <li style="list-style: none;font-size: 35px;">Victorias: {{victorias}}</li>
      <li style="list-style: none;">Derrotas: {{derrotas}}</li>
    </ul>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      victorias: 0,
      derrotas: 0
    };
  },
  created() {
    bus.$on("PalabraCompletada", () => {
      this.victorias++;
    });
    bus.$on("Ahorcado", () => {
      this.derrotas++;
    });
  }
};
</script>

<style scoped>
.vic-der {
  position: absolute;
  margin-top: -18rem;
  margin-left: -11%;
  font-size: 38px;
  text-align: left;
  font-family: "Press Start 2P", cursive;
}
.vic-der li{
  color: rgb(163, 81, 0);

}
</style>
