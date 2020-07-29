<template>
  <div class="container">
    <div class="card" style="width: 22rem;">
      <picture>
        <img class="card-image-top" :src="picture" width="256" />
        <input type="file" accept="image/*" @change="previewImage" />
      </picture>
      <!-- <button class="btn btn-primary" @click='storeAvatar()'>upload</button> -->
      <div class="card-body">
        <h1>Editar perfil</h1>
        <p><strong>Nombre: </strong>{{loggedUser.displayName}}</p>
        <p><strong>Email: </strong>{{loggedUser.email}}</p>
        <label >Tu estado:</label>
        <input v-model="about.state" type="text" />
        <label >Describete:</label>
        <input v-model="about.desc" type="text" />
        <button class="btn btn-danger" @click="commitChanges()">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase  from 'firebase';
import router from "../router/index";

export default {
  name: "AvatarUpload",
  data() {
    return {
      picture: null,
      imageData:null,
      loggedUser:null,
      uploadValue:0,
      about: {
        state:'',
        desc:''
      }
    };
  },
  created() {
    this.loggedUser=JSON.parse(localStorage.getItem('usuario'))
    this.picture=this.loggedUser.avatar?this.loggedUser.avatar:'/assets/default.png'
    this.about=this.loggedUser.about?this.loggedUser.about:{state:'', desc:''}
  },
  methods: {
    previewImage(e) {
      this.picture=null;
      this.imageData=e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.imageData);
      reader.onload=(e)=>{this.picture=e.target.result}
    },
    storeAvatar() {

      this.picture = null;
      const name=this.loggedUser.email
      console.log(name);
      console.log(this.imageData);

      const storageRef=firebase.storage().ref();
      const imagesRef=storageRef.child('avatars');
      const avatarRef=imagesRef.child(name);

  if(this.imageData){
    avatarRef.put(this.imageData).then(
      snapshot=> console.log('subida imagen', snapshot.state)
      ).catch(console.error)
  }
          
    },
    commitChanges(){
      this.storeAvatar();
      const userRef=firebase.firestore().collection('usuarios').doc(this.loggedUser.email);
      userRef.update({
        about:this.about,
        avatar: this.loggedUser.email
      })
                  router.push({ path: '/usuario/'+this.loggedUser.email});

    }
  },
};
</script>

<style>
.container {
  color: black;
}
</style>
