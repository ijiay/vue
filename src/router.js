import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './components/Index.vue'
import List from './components/List.vue'
import Suppliers from './components/suppliers.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', component: Index},
        {path: '/list/:id', component: List, name: 'list'},
        {path: '/suppliers/:id', component: Suppliers, name: 'suppliers'}
    ]
})

export {router}
