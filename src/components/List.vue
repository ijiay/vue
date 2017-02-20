<template>
    <div class="list">
        <div class="list-menu">
            <h4>所有分类</h4>
            <ul class="list-menu-box">
                <li v-for="(parentMenu, index) in menus"
                    :class="{'current': parentMenu.id == $route.params.id,'isToggle': isToggle}">
                    <div @click="parentMenuToggle(parentMenu)">{{parentMenu.text}}<img src="../assets/list/arrow.png" v-if="parentMenu.id !== $route.params.id"/><img src="../assets/list/arrow-current.png" v-if="parentMenu.id === $route.params.id"/></div>
                    <ul>
                        <li v-for="(childMenu, childIndex) in childMenus"
                            @click="changeChildMenu(childMenu)"
                            :class="{'current': childMenu.id == currentChildMenuId}">
                            <div>
                                {{childMenu.text}}
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

    export default {
        name: 'list',
        data () {
            return {
                menus: [],
                childMenus: [],
                currentChildMenuId: '',
                goodsLists: [],
                isToggle: false
            }
        },
        created: function () {
            let t = this
            t.menus = menu
            t.getChildMenu(t.$route.params.id)
        },
        methods: {
            parentMenuToggle: function (parentMenu) {
                let t = this
                if (parentMenu.id === t.$route.params.id) {
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
                t.currentChildMenuId = t.childMenus[0].id
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

