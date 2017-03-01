<template>
    <div class="index">
        <div class="grid type">
            <div class="col-3" v-for="menu in menus" @click="goToListPage(menu)">
                <div class="img"></div>
                <div>{{menu.name}}</div>
            </div>
            <div class="col-3">
                <div class="img"></div>
                <div>所有分类</div>
            </div>
        </div>

        <div class="promotion" @click="goToSuppliersPage('供应商')">
            <img src="../assets/index/hot-banner.jpg" />
        </div>

        <div class="grid hot-commodity">
            <h4>热门商品<img src="../assets/index/hot.png" @click="goToShopcarPage('购物车')" /></h4>
            <div class="col-6" v-for="goods in goodsLists">
                <div class="commodity-img">
                    <img :src="goods.imgurl" />
                </div>
                <div class="commodity-name">{{goods.name}}</div>
                <div class="commodity-info fix">
                    <div class="commodity-info-price">{{goods.price}}</div>
                    <div class="commodity-info-shop"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import {router} from '../router'
    // import menu from '../mock/menu'
    import goodsList from '../mock/goods-list'
    import dataService from '../getData/index'
    // import config from '../config'

    export default {
        name: 'index',
        router,
        created: function () {
            let t = this
            t.goodsLists = goodsList
            t.getList()
        },
        data () {
            return {
                menus: [],
                goodsLists: []
            }
        },
        methods: {
            goToListPage: function (menu) {
                router.push({name: 'list', params: {id: menu.id}})
            },
            goToSuppliersPage: function (value) {
                router.push({name: 'suppliers', query: {value: value}})
            },
            goToShopcarPage: function (value) {
                router.push({name: 'shopcar'})
            },
            getList: function () {
                let t = this
                dataService.getMenus().then(function ({data}) {
                    console.log(data.datalist)
                    t.$store.commit('setMenus', data.category_list)
                    t.menus = data.category_list
                    t.goodsLists = data.datalist
                    t.goodsLists.forEach((goods) => {
                        // goods.imgurl = `${config.url}${goods.imgurl}`
                    })
                })
            }
        }
    }

</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/index.less";
</style>

