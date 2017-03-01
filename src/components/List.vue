<template>
    <div class="list">
        <div class="list-menu">
            <h4>所有分类</h4>
            <ul class="list-menu-box">
                <li v-for="(parentMenu, index) in menus"
                    :class="{'current': parentMenu.id == $route.params.id,'isToggle': isToggle}">
                    <div @click="parentMenuToggle(parentMenu)">{{parentMenu.name}}<img src="../assets/list/arrow.png" v-if="parentMenu.id != $route.params.id"/><img src="../assets/list/arrow-current.png" v-if="parentMenu.id == $route.params.id"/></div>
                    <ul>
                        <li v-for="childMenu in parentMenu.subcategory_list"
                            @click="changeChildMenu(childMenu)"
                            :class="{'current': childMenu.id == currentChildMenuId}">
                            <div>
                                {{childMenu.name}}
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="list-category">
            <div class="list-category-item" v-for="goodsList in goodsLists">
                <div class="list-category-item-img">
                    <img src="../assets/index/a1.jpg" />
                </div>
                <div class="list-category-item-info">
                    <div class="list-category-item-info-name">{{goodsList.text}}</div>
                    <div class="list-category-item-info-price">{{goodsList.price}}</div>
                    <div class="list-category-item-info-supply">点击查看供应信息</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import {router} from '../router'
    import menu from '../mock/menu'
    import childMenu from '../mock/child-menu'
    import goodsList from '../mock/goods-list'
    import dataService from '../getData/index'

    export default {
        name: 'list',
        data () {
            return {
                childMenus: [],
                currentChildMenuId: '',
                goodsLists: [],
                isToggle: false
            }
        },
        computed: {
            menus () {
                return this.$store.state.menus
            }
        },
        created: function () {
            let t = this
            t.menus = menu
            if (this.$store.state.menus.length === 0) {
                dataService.getMenus().then(function ({data}) {
                    t.$store.commit('setMenus', data.category_list)
                    t.menus = data.category_list
                    t.getChildMenu(t.$route.params.id)
                })
            } else {
                t.getChildMenu(t.$route.params.id)
            }
        },
        methods: {
            parentMenuToggle: function (parentMenu) {
                let t = this
                if (parentMenu.id.toString() === t.$route.params.id.toString()) {
                    t.isToggle = !t.isToggle
                } else {
                    router.push({name: 'list', params: {id: parentMenu.id}})
                    t.getChildMenu(parentMenu.id)
                    t.isToggle = false
                }
            },
            changeChildMenu: function (childMenu) {
                let t = this
                t.currentChildMenuId = childMenu.id
                t.getGoodsList(t.currentChildMenuId)
            },
            getChildMenu: function (id) {
                let t = this
                t.childMenus = childMenu.filter(function (c) {
                    return c.parentId === id
                })
                t.currentChildMenuId = t.childMenus.length > 0 ? t.childMenus[0].id : 0
                t.getGoodsList(t.currentChildMenuId)
            },
            getGoodsList: function (id) {
                let t = this
                t.goodsLists = goodsList.filter(function (g) {
                    return g.ChildMenuId === id
                })
                console.log(t.goodsLists)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/list.less";
</style>

