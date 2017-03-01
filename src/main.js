// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import App from './App'
import './less/reset.less'
import './less/util.less'
import './less/grid.less'

Vue.use(Vuex)
Vue.use(VueResource)

// Vue.http.options.root = '/root'
// Vue.http.headers.common['Authorization'] = 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE4NTE0MjU0MTIzIiwidXNlcl9pZCI6MiwiZW1haWwiOiIiLCJleHAiOjE0ODgxODMwMTZ9.EIlxFUnvOmFowvAvPNWaqlcyil_zTwLjSfkEY2WxbrY'

import {router} from './router'

const store = new Vuex.Store({
    state: {
        menus: []
    },
    mutations: {
        setMenus (state, menus) {
            state.menus = menus
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
})()
