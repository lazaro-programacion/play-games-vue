<template>
  <div id="mi-contenedor">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/" style="width: 10%;">
        <img
          style="width: 100%;"
          src="https://1.bp.blogspot.com/-oR2xqBnrKSo/WjbzmygxflI/AAAAAAAANE8/kP69MMPBKwMkJb155AcvP9tMrCMvJOsPwCKgBGAs/s400/PongGIF.gif"
          class="d-inline-block align-top"
          alt="Kitten"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="'/'">Home</b-nav-item>
          <b-nav-item :to="'/juegos'">Lista de juegos</b-nav-item> 
          <b-nav-item :to="'/usuarios'">Lista de usuarios</b-nav-item>
        </b-navbar-nav>

        <div class="fotoo" v-if="usuario">
          <img src="@/assets/aaaaar.gif" class="d-inline-block align-top foto-usuario" alt="Kitten" />
          <span>{{usuario.displayName}}</span>
        </div>
        <b-navbar-nav class="ml-auto">
       
          <b-nav-item-dropdown right v-if="!usuario">

            <template v-slot:button-content>
              <em>Login</em>
            </template>
            <b-dropdown-item href="/login">Iniciar Sesion</b-dropdown-item>
            <b-dropdown-item href="/registro">Registro</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-button
            type="text"
            v-if="usuario"
            @click="cerrarSesion"
            class="btn btn-default"
          >Cerrar Sesion</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Navbar",
  methods: {
    ...mapActions(["cerrarSesion"])
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>

<style scoped>
#mi-contenedor {
  color: white;
}
.fotoo {
  width: 60%;
  border-radius: 77px;
  display: flex;
    justify-content: flex-end;
}
.foto-usuario {
  width: 15%;
  border-radius: 77px;
  float: right;
  padding-right: 9px;
  margin-top: -8px;
  margin-left: 11%;
}
span{
      line-height: 64px;
    margin-left: 9px;
}



</style>