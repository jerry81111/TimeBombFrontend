<template>
  <div>
   <span>Register Name:</span>
    <input type="text" v-model="playerName" placeholder="please insert name">
    <input type="file" id="playerPic"><br>
    <button type="button" @click="queue">進行排隊</button>
    <span>{{errorMsg}}</span>
    <ul>
      <li v-for="player in playerList" :key="player.name">
         {{player.name}}
      </li>
    </ul>
    <button type="button" @click="start">開始遊戲</button>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data () {
    return {
      playerList: '',
      playerName: '',
      errorMsg: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.axios.get('http://10.10.1.38:3000/getToken').then((res) => {
        this.$store.state.token = res.data.obj
        console.log('init token: ' + this.$store.state.token)
      })

      this.$socket.on('inProcession', (res) => {
        if (res.msg === 'error') {
          this.errorMsg = res.obj
        }
        if (res.msg === 'queue') {
          this.playerList = res.obj
          this.errorMsg = ''
        }
        if (res.msg === 'startGame') {
          this.$store.commit('setPlayerInfo', res.obj)
          this.$router.push({ name: 'Desk' })
        }
        if (res.msg === 'restart') {
          this.$router.push({ name: 'Register' })
        }
        if (res.msg === 'selectCard') {
          this.$store.commit('setPlayerInfo', res.obj)
        }
        if (res.msg === 'lock') {
          this.$store.commit('setSelected', res.obj)
        }
        if (res.msg === 'sendMsg') {
          this.$store.state.chatList = res.obj
        }
      })
    },
    queue () {
      let e = document.getElementById('playerPic')
      this.$socket.emit('queue', this.playerName, this.$store.state.token, e.files[0])
    },
    start () {
      this.$socket.emit('startGame')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
