// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './stores/playInfo.js'
import io from 'socket.io-client'

const url = 'http://10.10.1.38:3000'
Vue.prototype.$url = url
Vue.prototype.$socket = io(url)
Vue.use(VueAxios, axios)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
