<template>
  <div style="display:flex;height:100%;">
    <div style="width:80%;">
        <playerGroup></playerGroup>
    </div>
    <div style="width:20%;padding:2%;">
          <scoreboard style="height:40%;"></scoreboard>
          <chatroom style="height:60%;"></chatroom>
    </div>
  </div>
</template>

<script>
import playerGroup from '@/components/PlayerGroup'
import scoreboard from '@/components/Scoreboard'
import chatroom from '@/components/Chatroom'

export default {
  name: 'Desk',
  components: {
    'playerGroup': playerGroup,
    'scoreboard': scoreboard,
    'chatroom': chatroom
  }
}
</script>

<style>

</style>
