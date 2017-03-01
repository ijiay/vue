import Vue from 'Vue'
import VueResource from 'Vue-resource'

Vue.use(VueResource)

export default {
    getMenus: function () {
        return Vue.http.post('/api/productlist/')
    },

    getSuppliers: function () {
        return Vue.http.post('/api/supplierlist/', {}, {headers: {'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE4NTE0MjU0MTIzIiwidXNlcl9pZCI6MiwiZW1haWwiOiIiLCJleHAiOjE0ODgyNzEyMzh9.hFP-IytqnVKPOOlbf8RL5Yp_O8IIVVgl0DjgO65Fhu0'}})
    }
}
