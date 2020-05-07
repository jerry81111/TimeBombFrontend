<template>
  <div id = 'chatroom'>
    <div id="header">聊天室</div>
    <div id="content">
        <div  v-for="(chat, index) in chatList" v-bind:key="index">
            <span>{{chat.player.name}}:{{chat.msg}}</span>
        </div>
    </div>
    <div id="footer">
        <input type="text" v-model="msg" placeholder="請輸入內容">
        <button @click="sendMsg">發送</button>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    chatList: function () {
      return this.$store.state.chatList
    }
  },
  watch: {
    chatList: function () {
      this.$nextTick(function () {
        var container = this.$el.querySelector('#content')
        container.scrollTop = container.scrollHeight
      })
    }
  },
  methods: {
    sendMsg () {
      this.$socket.emit('sendMsg', this.msg, this.$store.getters.getToken)
    }
  }
}
</script>

<style scoped>

#chatroom > div{
    border-width:1px;
    border-style:solid;
    border-color:black;
    padding:10px;
}
#content {
    height:80%;
    overflow-y:scroll;
    overflow-x: hidden;
    word-break: break-all;

}
#content > div {
    padding:5px;
    text-align:left;
}
</style>
