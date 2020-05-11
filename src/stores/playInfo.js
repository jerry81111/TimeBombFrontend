import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  playerInfo: '',
  token: '',
  selected: false,
  chatList: []
}

const mutations = {
  setSelected (state, selected) {
    state.selected = selected
  },
  setPlayerInfo (state, playerInfo) {
    state.playerInfo = playerInfo
  },
  setPlayerList (state, playerList) {
    state.playerInfo.playerList = playerList
  },
  setChatList (state, chatList) {
    state.chatList = chatList
  }
}

const actions = {

}

const getters = {
  getSelected (state) {
    return state.selected
  },
  getToken (state) {
    return state.token
  },
  getPlayerInfo (state) {
    return state.playerInfo
  },
  getPlayerList (state) {
    return state.playerInfo.playerList
  },
  getChatList (state) {
    return state.chatList
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
