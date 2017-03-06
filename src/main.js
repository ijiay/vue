// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import App from './App'
import './less/reset.less'
import './less/util.less'
import './less/grid.less'

import InfiniteLoading from 'vue-infinite-loading'

Vue.use(Vuex)
Vue.use(VueResource)

Vue.component('infinite-loading', InfiniteLoading)

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
