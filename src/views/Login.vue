<template>
  <b-container xl>
    <b-row class="row">
      <b-col md="8" class="mi-fondo-imagen">
        <div class="tamnio"></div>
      </b-col>
      <b-col md="4" class="pt-5 form">
        <h1 class="mb-5">
          <strong style="color: black">Inicia Sesion</strong>
        </h1>

        <form @submit.prevent="ingresoUsuario(user)">
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
          <div>
            <b-alert
            v-if="error"
              :show="dismissCountDown"
              dismissible
              dismissed
              variant="danger"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
              :disabled="!showAlert()"
            >Datos incorrectos</b-alert>
          </div>
          <hr />
          <b-button type="submit"  :disabled="!validar()">Inicia Sesion</b-button>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Registro",
  data() {
    return {
      user: {
        email: "",
        pass1: "",
        
      },
      dismissSecs: 3,
      dismissCountDown: 0
    };
  },
  created() {},
  updated() {
    console.log("validar", this.validar());
  },
  methods: {
    validar() {
      return this.emailState && this.pass1State;
    },
    ...mapActions(["ingresoUsuario"]),

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  computed: {
    emailState() {
      return this.user.email.length > 0 ? true : false;
    },
    pass1State() {
      return this.user.pass1.length > 5 ? true : false;
    },
    ...mapState(["error"])
  }
};
</script>

<style scoped>
.row {
  background-color: rgb(52, 52, 50);
  height: 606.8px;
}
.form {
  background-color: gainsboro;
}
input {
  text-align: center;
  width: 88%;
  margin: 0 auto;
}
img {
  width: 80%;
  height: 77%;
}
.mi-fondo-imagen {
  background-image: url(https://pa1.narvii.com/6764/064ff96bb7e79f7c3c15179715ca01c0acf580e7_hq.gif);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.tamnio {
  height: 100%;
}
</style>