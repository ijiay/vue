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
                    <div class="list-category-item-info-name">{{goodsList.name}}</div>
                    <div class="list-category-item-info-price">{{goodsList.price}}</div>
                    <div class="list-category-item-info-supply">点击查看供应信息</div>
                </div>
            </div>
            <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
                <span slot="no-more">- 没有更多了 -</span>
                <span slot="no-results">- 没有更多了 -</span>
            </infinite-loading>
        </div>
    </div>
</template>

<script type="text/babel">
    import {router} from '../router'
    import childMenu from '../mock/child-menu'
    import dataService from '../getData/index'

    export default {
        name: 'list',
        data () {
            return {
                childMenus: [],
                menus: [],
                currentChildMenuId: null,
                goodsLists: [],
                isToggle: false,
                pageNumber: 1
            }
        },
        computed: {
            page_number () {
                return this.pageNumber
            }
        },
        created: function () {
            // let t = this
        },
        methods: {
            onInfinite () {
                let t = this
                let postData = {
                    category: parseInt(t.$route.params.id),
                    subcategory: t.currentChildMenuId,
                    data_number: 6,
                    page_number: t.pageNumber
                }
                dataService.getListmenus(postData).then(function ({data}) {
                    // 取到菜单的数据
                    t.menus = data.category_list
                    // 当前子菜单默认第一个子类否或者是点击对应点子类id
                    t.currentChildMenuId = t.currentChildMenuId || t.menus[0].subcategory_list[0].id
                    t.goodsLists = t.goodsLists.concat(data.datalist)
                    switch (data.code) {
                        case 199:
                            t.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
                            break
                        case 411:
                            t.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
                            break
                        default:
                            window.alert(data.msg)
                            break
                    }
                })
                t.pageNumber++
            },
            resetGoodsList () {
                let t = this
                t.goodsLists = []
                t.pageNumber = 1
                t.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            },
            parentMenuToggle: function (parentMenu) {
                let t = this
                if (parentMenu.id.toString() === t.$route.params.id.toString()) {
                    t.isToggle = !t.isToggle
                } else {
                    router.push({name: 'list', params: {id: parentMenu.id}})
                    t.isToggle = false
                }
                t.currentChildMenuId = parentMenu.subcategory_list[0] && parentMenu.subcategory_list[0].id || null
                t.resetGoodsList()
            },
            changeChildMenu: function (childMenu) {
                let t = this
                t.currentChildMenuId = childMenu.id
                t.resetGoodsList()
            },
            getChildMenu: function (id) {
                let t = this
                t.childMenus = childMenu.filter(function (c) {
                    return c.parentId === id
                })
                t.currentChildMenuId = t.childMenus.length > 0 ? t.childMenus[0].id : 0
                t.getGoodsList(t.currentChildMenuId)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/list.less";
</style>

