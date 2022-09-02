import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import Search from './views/Search.vue'
import DetailView from './views/DetailView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.PUBLIC_URL,
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/search/:query',
      name: 'search',
      component: Search
    },

    {
      path: '/coins/:tokenName',
      name: 'detailView',
      component: DetailView
    },

    {
        path: "*",
        component: NotFound
   }

  ]
})
