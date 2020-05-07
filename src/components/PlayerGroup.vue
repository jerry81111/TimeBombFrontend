<template>
  <div id = 'playerGroup'>
    <div v-bind:style="{ position: 'absolute'}" class=players v-for="(player, index) of playerList " v-bind:key="index">
        <player :index="index"></player>
    </div>
    <div v-bind:style="{ position: 'absolute'}" id='endWindows' >
      <span v-if="endMsg">
            {{endMsg}}
            <button type="button" @click="restart">再來一局</button>
      </span>
    </div>
  </div>
</template>

<script>
import player from '@/components/Player'

export default {
  name: 'PlayerGroup',
  components: {
    'player': player
  },
  computed: {
    playerList: function () {
      return this.$store.getters.getPlayerList
    },
    endMsg: function () {
      let info = this.$store.getters.getPlayerInfo
      switch (info.end) {
        case 0:
          return '壞人陣營獲勝'
        case 1:
          return '好人陣營獲勝'
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    handleResize () {
      this.$nextTick(() => {
        let father = document.getElementById('playerGroup')
        let son = document.getElementsByClassName('players')
        let endWindows = document.getElementById('endWindows')

        var radius = father.clientHeight / 2 - son[0].clientHeight / 1
        var avd = 360 / son.length
        var ahd = avd * Math.PI / 180
        for (let i = 0; i < son.length; i++) {
          son[i].style.left = (Math.sin((ahd * i)) * radius * father.clientWidth / father.clientHeight + father.clientWidth / 2 - son[i].clientWidth / 2) + 'px'
          son[i].style.top = (Math.cos((ahd * i)) * radius + father.clientHeight / 2 - son[i].clientHeight / 2) + 'px'
        }
        endWindows.style.left = father.clientWidth / 2 - endWindows.clientWidth / 2 + 'px'
        endWindows.style.top = father.clientHeight / 2 - endWindows.clientHeight / 2 + 'px'
      })
    },
    restart () {
      this.$socket.emit('restart')
    }
  }
}
</script>

<style scoped>
#playerGroup{
  border-width:1px;
  border-style:solid;
  border-color:black;
  height:100%;
}
#playerGroup > div{
  border-width:1px;
  border-style:solid;
  border-color:black;
  width:300px;
}

</style>
