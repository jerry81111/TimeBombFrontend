<template>
  <div class = 'player'>
      <ul>
        <li v-for="(card, index) in player.cards" :key="index">
            <img v-if="turn.token === token && card === 3 && selected === false" :src="require('../../static/images/gameCard'+ card+ '.jpg')" @click="selectCard(player.id,index)">
            <img v-else :src="require('../../static/images/gameCard'+ card+ '.jpg')">

        </li>
      </ul>
    <span>{{player.name}}</span>
    <br>
    <img v-bind:src="'data:image/jpeg;base64,'+ player.photo" />

  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    index: ''
  },
  computed: {
    player: function () {
      return this.$store.getters.getPlayerList[this.index]
    },
    turn: function () {
      return this.$store.getters.getPlayerList[this.$store.state.playerInfo.turn - 1]
    },
    token: function () {
      return this.$store.getters.getToken
    },
    selected: function () {
      return this.$store.getters.getSelected
    }
  },
  methods: {
    selectCard (player, card) {
      if (this.$store.state.playerInfo.turn !== player) {
        this.$socket.emit('selectCard', player, card)
      }
    }
  }
}
</script>

<style>
  .player ul {
    list-style-type: none;
  }
  .player li {
    display: inline-block;
  }

</style>
