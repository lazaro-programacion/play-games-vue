<template>
  <b-container xl>
  <b-row class="row  ">
  <b-col md="8"	 class="mi-fondo-imagen">
  <!--<img src="https://www.r-cade.fr/wp-content/uploads/2016/02/GaMMIng-Fest.jpg" alt="gamming familiar"> -->
  <div class="tamnio"></div>
  </b-col>
  <b-col  md="4" class="pt-5 form">
   <h1 class="mb-5">
   <strong style="color: black">   Registro de Usuarios</strong>
   </h1>
   
    <form @submit.prevent="crearUsuario(user)">
      <div role="group">
        <b-form-input
          id="input-live"
          v-model.lazy="user.nombre"
          :state="nameState"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Ingresa tu nombre"
          trim
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">El campo no puede estar vacio</b-form-invalid-feedback>
      </div>

      <hr />

      <div role="group">
        <b-form-input
          id="input-live"
          v-model="user.email"
          :state="emailState"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Ingresa el email"
          trim
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">El campo no puede estar vacio</b-form-invalid-feedback>
      </div>

      <hr />

      <div role="group">
        <b-form-input
          type="password"
          id="input-live"
          v-model="user.pass1"
          :state="pass1State"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Ingresa contraseña"
          trim
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">El campo no puede estar vacio</b-form-invalid-feedback>
      </div>

      <hr />

      <div role="group">
        <b-form-input
          type="password"
          id="input-live"
          v-model="pass2"
          :state="pass2State"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Repite contraseña"
          trim
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">El campo no puede estar vacio</b-form-invalid-feedback>
      </div>
      <hr>
      <b-button type='submit' :disabled="!validar()">Registrar usuario</b-button>
    </form>
    </b-col>
   </b-row>
   <p v-if="error">Datos incorrectos</p>
  </b-container>

</template>

<script>
import {mapActions, mapState } from 'vuex';
export default {
  name: "Registro",
  data() {
    return {
      user: {
        nombre: "",
        email: "",
        pass1: "",
        rol: "user"
      },
      pass2: "",
    };
  },
  created() {
  },
  updated() {
    console.log("validar", this.validar());
  },
  methods: {
    validar() {
      return (
        this.nameState && this.emailState && this.pass1State && this.pass2State
      );
    },
    ...mapActions(['crearUsuario'])
  },
  computed: {
    nameState() {
      return this.user.nombre.length > 0 ? true : false;
    },
    emailState() {
      return this.user.email.length > 0 ? true : false;
    },
    pass1State() {
      return this.user.pass1.length > 5 ? true : false;
    },
    pass2State() {
      return this.user.pass1 === this.pass2 && this.user.pass1 !== "" ? true : false;
    },
    ...mapState(['error'])
  }
};
</script>

<style scoped>
.row{
  background-color: rgb(52,52,50);
}
.form{
  background-color: gainsboro;

}
input {
  text-align: center;
  width: 88%;
  margin: 0 auto;
}
img{
 width: 80%;
 height: 77%;
}
.mi-fondo-imagen{
    background-image: url(https://unmodestocomentario.files.wordpress.com/2017/07/space-invaders.gif);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
}
.tamnio{
    height: 100%;
}

</style>