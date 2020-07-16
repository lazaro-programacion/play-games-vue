<template>
  <div class="container-fluid " >
  <div class="row">
  <div class="md-col-8 sm-col-10 mi-fondo-imagen">
  <img src="https://www.r-cade.fr/wp-content/uploads/2016/02/GaMMIng-Fest.jpg" alt="gamming familiar">
  </div>
  <div class="md-col-4 sm-col-10 pt-5">
   <h1 class="mb-5">
   <strong>   Registro de Usuarios</strong>
   </h1>
   
    <form @submit.prevent="enviarForm(user)">
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
      <button class="btn btn-primary" :disabled="!validar()">Registrar usuario</button>
    </form>
    </div>
   </div>
  </div>
</template>

<script>
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
  updated() {
    console.log("validar", this.validar());
  },
  methods: {
    validar() {
      return (
        this.nameState && this.emailState && this.pass1State && this.pass2State
      );
    },
    enviarForm() {
      console.log("Lo has enviado correctamente",this.user);
    }
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
    }
  }
};
</script>

<style scoped>
.mi-fondo-imagen{
    background-color: rgb(52,52,50);
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
</style>