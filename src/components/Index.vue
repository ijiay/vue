<template>
    <div class="index">
        <div class="grid type">
            <div class="col-3" v-for="menu in menus" @click="goToListPage(menu)">
                <div class="img"></div>
                <div>{{menu.text}}</div>
            </div>
            <div class="col-3">
                <div class="img"></div>
                <div>所有分类</div>
            </div>
        </div>

        <div class="promotion" @click="goToSuppliersPage(supplier)">
            <img src="../assets/index/hot-banner.jpg" />
        </div>

        <div class="grid hot-commodity">
            <h4>热门商品<img src="../assets/index/hot.png" /></h4>
            <div class="col-6" v-for="goodsList in goodsLists">
                <div class="commodity-img">
                    <img src="../assets/index/a1.jpg" />
                    <!--<img :src="goods.src" />-->
                </div>
                <div class="commodity-name">{{goodsList.text}}</div>
                <div class="commodity-info fix">
                    <div class="commodity-info-price">{{goodsList.price}}</div>
                    <div class="commodity-info-shop"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {router} from '../router'
    import menu from '../mock/menu'
    import goodsList from '../mock/goods-list'

    export default {
        name: 'index',
        router,
        created: function () {
            let t = this
            t.menus = menu
            t.goodsLists = goodsList
        },
        data () {
            return {
                menus: [],
                goodsLists: []
            }
        },
        methods: {
            goToListPage: function (menu) {
                router.push({name: 'list', params: {id: menu ? menu.id : '1'}})
            },
            goToSuppliersPage: function (supplier) {
                router.push({name: 'suppliers', params: {id: supplier ? supplier.id : '1'}})
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/index.less";
</style>

