<template>
    <div id="shopcar">
        <div class="shopcar-tabbtn">
            <header class="shopcar-header">
                <div class="title">购物车</div>
                <div class="title-icon title-right">
                    <span v-if="shopCarState == 'none'">编辑</span>
                    <span v-if="shopCarState == 'shopping'">编辑</span>
                    <span v-if="shopCarState == 'edit'">完成</span>
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
                <div class="sup-item" v-for="sup in shopCarList">
                    <div class="sup-item-title">
                        <input type="checkbox"
                               v-model="sup.checked"
                               class="sub-check">
                        <label class="check-label"
                               @click="checkSup(sup)"></label>
                        <img src="../assets/shopcar/shop.png" class="sub-icon">
                        <span>{{sup.checked}}</span>
                        <span class="right-arrow"></span>
                    </div>
                    <div class="sup-item-list">
                        <div class="goods-item" v-for="goods in sup.goodsList">
                            <div class="goods-item-check" @click="checkGoods(sup, goods)">
                                <input type="checkbox"
                                       v-model="goods.checked"
                                       class="check">
                                <label class="check-label"></label>
                            </div>
                            <div class="img">
                                <img src="../assets/shopcar/a1.jpg" />
                            </div>
                            <div class="info">
                                <div class="title">
                                    <a>{{goods.name}}</a>
                                </div>
                                <div class="detail">{{goods.size}}</div>
                                <div class="other">
                                    <div class="price">￥{{goods.price}}</div>
                                    <div class="num-btn">
                                        <input type="number"
                                               v-model="goods.currentNum"
                                               @blur="checkCurrentNum(goods)"
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
                    </div>
                    <div class="sup-item-footer">
                        <div class="starting-price">
                            <span>起送价：</span>
                            <span>￥{{sup.startingPrice}}</span>
                        </div>
                        <div class="sup-item-total">
                            <span>合计：</span>
                            <span class="sup-item-total-price">￥16.50</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shopcar-list-footer">
                <div class="shopcar-list-shopping" v-if="shopCarState == 'shopping'">
                    <div class="shopcar-list-btn">
                        <input type="checkbox"
                               v-model="checkedAll"
                               id="shoppingCheck"
                               class="shopcar-list-check">
                        <label class="check-label"
                               @click="checkAll()"></label>
                        <span>全选</span>
                        <div class="shopcar-list-total">合计:<span>￥16.50</span></div>
                    </div>
                    <div class="settlement">结算(<span>0</span>)</div>
                </div>
                <div class="shopcar-list-shopping" v-if="shopCarState == 'edit'">
                    <div class="shopcar-list-btn edit">
                        <input type="checkbox"
                               v-model="checkedAll"
                               class="shopcar-list-check">
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
    import shopCarList from '../mock/shop-car'

    export default {
        name: 'shopCar',
        data () {
            return {
                /** none指的是购物车为空，edit为编辑状态，shopping为有商品时状态
                 */
                shopCarState: 'shopping',
                shopCarList,
                checkedAll: false
            }
        },
        created () {
            let t = this
            t.shopCarList && t.shopCarList.forEach(function (sup) {
                t.$set(sup, 'checked', false)
                sup.goodsList && sup.goodsList.forEach(function (goods) {
                    t.$set(goods, 'checked', false)
                })
            })
        },
        methods: {
            reduceGoods (goods) {
                if (goods.currentNum <= goods.minBuyNum) {
                    return false
                } else {
                    goods.currentNum--
                }
            },
            addGoods (goods) {
                if (goods.currentNum >= goods.maxBuyNum) {
                    return false
                } else {
                    goods.currentNum = parseInt(goods.currentNum) + 1
                }
            },
            checkCurrentNum (goods) {
                if (!goods.currentNum || Number.isNaN(goods.currentNum) || goods.currentNum < goods.minBuyNum) {
                    goods.currentNum = goods.minBuyNum
                } else if (goods.currentNum >= goods.maxBuyNum) {
                    goods.currentNum = goods.maxBuyNum
                }
            },
            checkGoods (sup, goods) {
                let t = this
                goods.checked = !goods.checked
                t.isCheckAll(sup)
            },
            isCheckAll (sup) {
                let t = this
                let check = function (list) {
                    return list.every(function (item) {
                        return item.checked
                    })
                }
                if (check(sup.goodsList)) {
                    sup.checked = true
                } else {
                    sup.checked = false
                }
                if (check(t.shopCarList)) {
                    t.checkedAll = true
                } else {
                    t.checkedAll = false
                }
            },
            checkAll () {
                let t = this
                if (t.checkedAll) {
                    t.shopCarList && t.shopCarList.forEach(function (sup) {
                        sup.checked = false
                        sup.goodsList && sup.goodsList.forEach(function (goods) {
                            goods.checked = false
                        })
                    })
                } else {
                    t.shopCarList && t.shopCarList.forEach(function (sup) {
                        sup.checked = true
                        sup.goodsList && sup.goodsList.forEach(function (goods) {
                            goods.checked = true
                        })
                    })
                }
                t.checkedAll = !t.checkedAll
            },
            checkSup (sup) {
                let t = this
                if (!sup.checked) {
                    sup.goodsList.forEach(function (goods) {
                        goods.checked = true
                    })
                } else {
                    sup.goodsList.forEach(function (goods) {
                        goods.checked = false
                    })
                }
                sup.checked = !sup.checked
                t.isCheckAll(sup)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/shopcar.less";
</style>

