<template>
    <div id="shopcar" @touchend="closeSideSwipes()">
        <div class="shopcar-tabbtn">
            <header class="shopcar-header">
                <div class="title">购物车</div>
                <div class="title-icon title-right">
                    <span v-if="shopCarState == 'none'">编辑</span>
                    <span v-if="shopCarState == 'shopping'"
                          @click="shopCarState = 'edit'">编辑</span>
                    <span v-if="shopCarState == 'edit'"
                          @click="shopCarState = 'shopping'">完成</span>
                </div>
            </header>
        </div>
        <div class="shopcar-body">
            <div class="empty" v-if="shopCarState == 'none'">
                <img src="../assets/shopcar/shopcar1.png" />
                <p>购物车空空如也~快去买买买</p>
                <div>去逛逛</div>
            </div>
            <div class="shopcar-list" v-if="shopCarState != 'none'">
                <div class="sup-item" v-for="sup in basketSuppliers">
                    <div class="sup-item-title">
                        <input type="checkbox"
                               v-model="sup.checked"
                               class="sub-check">
                        <label class="check-label"
                               @click="checkSup(sup)"></label>
                        <img src="../assets/shopcar/trademark.png" class="sub-icon">
                        <span>{{sup.supplier_name}}</span>
                        <span class="right-arrow"></span>
                    </div>
                    <div class="sup-item-list">
                        <side-swipe v-for="goods in sup.product_list"
                                    @setstatus="setSideSwipeStatus"
                                    :status="sideSwipeStatusArr"
                                    :touchnum="touchNum"
                                    :btns="goods.btns">
                            <div class="goods-item">
                                <div class="goods-item-check" @click="checkGoods(sup, goods)">
                                    <input type="checkbox"
                                           v-model="goods.checked"
                                           class="check">
                                    <label class="check-label"></label>
                                </div>
                                <div class="img">
                                    <img :src="goods.product_pic" />
                                </div>
                                <div class="info">
                                    <div class="title">
                                        <a>{{goods.product_name}}</a>
                                    </div>
                                    <div class="detail">{{goods.size}}</div>
                                    <div class="other">
                                        <div class="price">￥{{goods.product_price}}</div>
                                        <div class="num-btn">
                                            <input type="number"
                                                   v-model="goods.currentNum"
                                                   @blur="checkCurrentNumOnBlur(goods)"
                                                   class="number"/>
                                            <div class="reduce"
                                                 @click="reduceGoods(goods)"
                                                 :class="{'disabled': goods.currentNum <= goods.minBuyNum}"></div>
                                            <div class="add"
                                                 @click="addGoods(goods)"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </side-swipe>
                    </div>
                    <div class="sup-item-footer">
                        <div class="starting-price">
                            <span>起送价：</span>
                            <span>￥{{sup.startingPrice}}</span>
                        </div>
                        <div class="sup-item-total">
                            <span>合计：</span>
                            <span class="sup-item-total-price">￥{{sup.summary}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shopcar-list-footer">
                <div class="shopcar-list-shopping" v-if="shopCarState == 'shopping'">
                    <div class="shopcar-list-btn">
                        <input type="checkbox"
                               v-model="checkedAll"
                               class="shopcar-list-check">
                        <label class="check-label"
                               @click="checkAllOrNot()"></label>
                        <span>全选</span>
                        <div class="shopcar-list-total">合计:<span>￥{{checkedGoodsPrice}}</span></div>
                    </div>
                    <div class="settlement">结算(<span>{{checkedGoodsAmount}}</span>)</div>
                </div>
                <div class="shopcar-list-shopping" v-if="shopCarState == 'edit'">
                    <div class="shopcar-list-btn edit">
                        <input type="checkbox"
                               v-model="checkedAll"
                               class="shopcar-list-check">
                        <label class="check-label"
                               @click="checkAllOrNot()"></label>
                        <span>全选</span>
                    </div>
                    <div class="shopcar-list-collect">加入收藏</div>
                    <div class="settlement">删除</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
//    import shopCarList from '../mock/shop-car'
    import sideSwipe from './sideSwiper.vue'
    import {getIndexOfArrayFromProp} from '../utils'
    import dataService from '../getData/index'

    export default {
        name: 'shopCar',
        components: {
            sideSwipe
        },
        data () {
            return {
                // none指的是购物车为空，edit为编辑状态，shopping为有商品时状态
                shopCarState: 'shopping',
                shopCarList: [],
                basketSuppliers: [],
                // 默认全部不选中
                checkedAll: false,
                // 选中的商品种类数量
                checkedGoodsAmount: 0,
                // 选中的商品总价
                checkedGoodsPrice: 0,
                // 子sideSwipe状态
                sideSwipeStatusArr: [],
                // 监听此属性，如有变动关闭子sideSwipe
                touchNum: 0
            }
        },
        created () {
            let t = this
            t.getShopcarList()
        },
        methods: {
            initGoodsSwipe () {
                let t = this
                t.basketSuppliers && t.basketSuppliers.forEach(function (sup) {
                    t.$set(sup, 'checked', false)
                    t.$set(sup, 'totalPrice', 0)
                    sup.product_list && sup.product_list.forEach(function (goods) {
                        t.$set(goods, 'checked', false)
                        t.$set(goods, 'btns', [
                            {
                                name: '加入收藏',
                                bgc: '#ccc',
                                width: '65px',
                                cb: function () {
                                    window.alert(goods.id)
                                }
                            },
                            {
                                name: '删除',
                                width: '65px',
                                bgc: '#ff2d2d',
                                cb: function () {
                                    window.alert(goods.id)
                                }
                            }
                        ])
                    })
                })
            },
            closeSideSwipes () {
                let t = this
                let status = t.sideSwipeStatusArr.some(function (item) {
                    return item.isOpened
                })
                if (status) {
                    t.touchNum++
                }
            },
            // 减少商品
            reduceGoods (goods) {
                let t = this
                if (goods.currentNum > goods.minBuyNum) {
                    goods.currentNum--
                }
                t.isCheckAllAndComputedPrice()
            },
            // 增加商品
            addGoods (goods) {
                let t = this
                if (goods.currentNum < goods.maxBuyNum) {
                    goods.currentNum++
                }
                t.isCheckAllAndComputedPrice()
            },
            // 当blur时，检查数量是否符合规则
            checkCurrentNumOnBlur (goods) {
                let t = this
                if (!goods.currentNum || Number.isNaN(goods.currentNum) || goods.currentNum < goods.minBuyNum) {
                    goods.currentNum = goods.minBuyNum
                } else if (goods.currentNum >= goods.maxBuyNum) {
                    goods.currentNum = goods.maxBuyNum
                } else {
                    goods.currentNum = parseInt(goods.currentNum)
                }
                t.isCheckAllAndComputedPrice()
            },
            // 点击选择商品时规则
            checkGoods (sup, goods) {
                let t = this
                goods.checked = !goods.checked
                t.isCheckAllAndComputedPrice(sup)
            },
            // 检测选中规则：点击全选按钮时，无需传入sup
            isCheckAllAndComputedPrice (sup) {
                let t = this
                let check = function (list) {
                    return list.every(function (item) {
                        return item.checked
                    })
                }

                // 计算各个供应商下商品的价格&&计算总共的价格还有商品的数量
                t.checkedGoodsAmount = 0
                t.checkedGoodsPrice = 0
                t.shopCarList.forEach(function (item) {
                    item.totalPrice = 0
                    item.goodsList.forEach(function (goods) {
                        item.totalPrice += (goods.checked ? goods.currentNum * goods.price : 0)
                        t.checkedGoodsAmount += (goods.checked ? 1 : 0)
                        t.checkedGoodsPrice += (goods.checked ? goods.currentNum * goods.price : 0)
                    })
                })

                // 检测是否传入供应商，如果传入，则计算该供应商的选中和整体的选中
                sup && (sup.checked = !!check(sup.goodsList))
                sup && (t.checkedAll = !!check(t.shopCarList))
            },
            // 点击全选或者反选
            checkAllOrNot () {
                let t = this
                t.shopCarList && t.shopCarList.forEach(function (sup) {
                    sup.checked = !t.checkedAll
                    sup.goodsList && sup.goodsList.forEach(function (goods) {
                        goods.checked = !t.checkedAll
                    })
                })
                t.checkedAll = !t.checkedAll
                t.isCheckAllAndComputedPrice()
            },
            // 点击选择供应商时
            checkSup (sup) {
                let t = this
                sup.goodsList.forEach(function (goods) {
                    goods.checked = !sup.checked
                })
                sup.checked = !sup.checked
                t.isCheckAllAndComputedPrice(sup)
            },
            setSideSwipeStatus (status) {
                let t = this
                let index = getIndexOfArrayFromProp(t.sideSwipeStatusArr, 'id', status.id)
                if (index === -1) {
                    t.sideSwipeStatusArr.push(status)
                } else {
                    t.sideSwipeStatusArr[index].isOpened = status.isOpened
                }
            },

            getShopcarList: function () {
                let t = this
                dataService.getBasket().then(function ({data}) {
                    t.shopCarList = data.basket_info
                    t.basketSuppliers = data.basket_info.data_list
                    t.initGoodsSwipe()
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/shopcar.less";
</style>

