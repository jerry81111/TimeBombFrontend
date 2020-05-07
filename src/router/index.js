import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Desk from '@/components/Desk'
import Player from '@/components/Player'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/desk',
      name: 'Desk',
      component: Desk
    },
    {
      path: '/player',
      name: 'Player',
      component: Player,
      props: true
    }
  ]
})
