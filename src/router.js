import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './components/Index.vue'
import List from './components/List.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', component: Index},
        {path: '/list/:id', component: List, name: 'list'}
    ]
})

export {router}
