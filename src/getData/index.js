import Vue from 'Vue'
import VueResource from 'Vue-resource'

Vue.use(VueResource)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE4NTE0MjU0MTIzIiwidXNlcl9pZCI6MiwiZW1haWwiOiIiLCJleHAiOjE0ODg2MTA5NjR9.uM6RySbaFRNnSCfu7EZ8zmLV74fqUiSy14cDZFG1TOo'

function postDataHasToken (url, data) {
    return Vue.http.post(url, data, {headers: {'Authorization': `JWT ${token}`}})
}

function postData (url, data) {
    data = data || {}
    return Vue.http.post(url, data)
}

export default {
    getMenus: function () {
        return postData('/api/index/')
    },

    getListmenus: function (data) {
        return postData('/api/productlist/', data)
    },

    getSuppliers: function (data) {
        return postDataHasToken('/api/supplierlist/', data)
    },

    getBasket: function (data) {
        return postDataHasToken('/api/getbasket/', data)
    }
}

