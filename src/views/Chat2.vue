<template>
  <div class="container master">
    <h1>sala 1</h1>
    <div class="mesa" :style="{ height: messa + 'px' }">
      <div class="user1" :style="{
                        left: 0 + 'px',
                        top: yPosP1 + 'px',
                    }"></div>
      <div class="user2"  :style="{
                        left: 0 + 'px',
                        top: yPosP2 + 'px',
                    }" ></div>
    <div class="ball">
    <div class="pelota" :style="{
                            width: size + 'px',
                            height: size + 'px',
                            left: xBall + 'px',
                            top: yBall + 'px',
                          }"></div>
    </div>
      
    </div>
    <div class="chat">
      <div class="player-1" >
        Player 1
        <button >ply1</button>
      </div>
      <div class="player-2">
        Player 2
        <button >ply2</button>
      </div>
      <div class="mensaje">Escribir mensaje</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data () {
    return {
      yPosP1:  160, 
      yPosP2:  160 ,

      size: 20,
      xBall: 0,
      yBall: 0,
      xDir: '',
      yDir: '',
      speed: 2,
      interval: null,
      messa: 400,
     comparacion: 0
    }
  },
  updated(){
    this.yPosP1 = (this.yBall + 140)
    this.yPosP2 = (this.yBall + 140)

  },
  created() {
           

this.startMoving()
    window.addEventListener('keydown', this.keyPressed)

  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
   
     keyPressed (e) {
      if ( e.key === 'w' ) {
        this.yPosP1 = this.yPosP1 - 10
        console.log(e.key);
      }
      if ( e.key === 's' ) {
        this.yPosP1 = this.yPosP1 + 10
      }
       if ( e.key === 'q' ) {
        this.yPosP2 = this.yPosP2 - 10
      }
      if ( e.key === 'a' ) {
        this.yPosP2 = this.yPosP2 + 10
      }

      
    },
      move () {
      if (this.xDir === 'leftToRight') {
        this.xBall = this.xBall + 10
      } else {
        this.xBall = this.xBall - 10
      }
      if (this.yDir === 'bottomToTop') {
        this.yBall = this.yBall + 10
      } else {
        this.yBall = this.yBall - 10
      }
      this.checkForWall()
    },
    reverseDirection (hitLeftPaddle, hitTopHalfOfPaddle) {
      if (hitLeftPaddle) {
        this.xDir = 'leftToRight'
      } else {
        this.xDir = 'rightToLeft'
      }
      if (hitTopHalfOfPaddle) {
        this.yDir = 'bottomToTop'
      } else {
        this.yDir = 'topToBottom'
      }
    
    },
    
    reset () {
      this.yBall = (0 - this.size) / 2
      this.xBall = (400- this.size) / 2
    },
    accelerate (force) {
      this.speed = this.speed + force
    },
    startMoving () {

      const randomNumber1 = Math.random()
      const randomNumber2 = Math.random()
      this.speed = 10
      randomNumber1 < 0.5 ? this.xDir = 'leftToRight' : this.xDir = 'rightToLeft'
      randomNumber2 < 0.5 ? this.yDir = 'bottomToTop' : this.yDir = 'topToBottom'
      this.interval = setInterval(this.move, 100)
      console.log(this.yBall);
    },
    checkForWall () {
      if (this.yBall < 20 - this.size) { //arriba
        this.yDir = 'bottomToTop'
      }
      if (this.yBall > this.messa - this.size) { //abajo
        this.yDir = 'topToBottom'
      }
       if (this.xBall == 490 ) { //abajo
        this.xDir = 'rightToLeft'

      }


      
       if (this.xBall == -490 ) { 
        console.log('ball',this.xBall);
        for ( let i = 0; i <= 83; i++) { 
          this.comparacion = this.yPosP1 + i
                      console.log('comparacion',this.comparacion, (this.yBall + 160));

        if (  (this.yBall + 160) === this.comparacion){
            this.xDir = 'leftToRight'
        }

          }//abajo

      
      }
    },
  
 
  },
    mounted () {
   
    this.startMoving()
  },
};
</script>

<style scoped>
.mesa {
border: 8px solid black;
    height: 400px;
    background-color: black;
    max-height: 400px;
    min-height: 0px;
}
.user1 {
  height: 83px;
  background: white;
  width: 15px;
  margin-left: 25px;
    position: sticky;
}
.user2 {
  height: 83px;
  background: white;
  width: 15px;
  float: right;
    position: sticky;

  margin-right: 25px;
}
.pelota {
  height: 20px;
  width: 20px;
  border-radius: 15px;
  background: white;
  margin: auto;
      position: relative;

}
.master {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.chat {
  height: 330px;
  width: 100%;
  border: 5px solid white;
}
.player-1 {
  border: 2px solid white;
  height: 30px;
  width: 232px;
  margin-left: 14px;
  margin-top: 191px;
}
.player-2 {
  border: 2px solid white;
  height: 30px;
  width: 232px;
  margin-right: 20px;
  margin-top: -85px;
  float: right;
}

.ball{
      height: 400px;
    width: 100%;
    position: relative;
    margin-top: -91px;
}
</style>