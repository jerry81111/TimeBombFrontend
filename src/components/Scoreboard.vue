<template>
  <div id = 'scoreboard'>
      <div>出牌 : {{turn.name}}</div>
      <div>玩家 : {{player.name}}</div>
      <div><img :src="require('../../static/images/character'+ player.character+ '.jpg')"> </div>
      <div>
      <span  v-for="(card, index) of cards " v-bind:key="index">
        <img :src="require('../../static/images/gameCard'+ index+ '.jpg')"> * {{card}}
      </span>
      </div>
      <div>
        <button type="button" @click="restart">重新開始</button>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    turn: function () {
      return this.$store.getters.getPlayerList[this.$store.state.playerInfo.turn - 1]
    },
    token: function () {
      return this.$store.getters.getToken
    },
    player: function () {
      let sysToken = this.token
      return this.$store.getters.getPlayerList.find(function (player) { return player.token === sysToken })
    },
    cards: function () {
      let sysToken = this.token
      let result = this.$store.state.playerInfo.result[this.$store.getters.getPlayerList.findIndex(function (player) { return player.token === sysToken })]
      var cards = [ 0, 0, 0 ]
      result.forEach(element => {
        if (element === 0) { cards[0]++ }
        if (element === 1) { cards[1]++ }
        if (element === 2) { cards[2]++ }
      })
      return cards
    }
  },
  methods: {
    restart () {
      this.$socket.emit('restart')
    }
  }
}
</script>

<style>
#scoreboard > div{
    border-width:1px;
    border-style:solid;
    border-color:black;
    padding:10px;
}

</style>
