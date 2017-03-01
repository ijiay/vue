<template>
    <div class="order">
        <div class="order-tabbtn">
            <header class="order-header">
                <div class="left-arrow"></div>
                <div class="title">我的订单</div>
                <ul class="toggle-btn">
                    <li v-for="ordermode in orderBtns"
                        @click="changeType(ordermode.id)"
                        :class="{'current': ordermode.id == type}">{{ordermode.text}}
                    </li>
                </ul>
            </header>
        </div>
        <div class="order-body">
            <div class="order-list">
                <div class="order-list-item" v-for="order in orderList">
                    <div class="title">
                        <img src="../assets/order/trademark.png" class="order-icon">
                        <span class="title-text">{{order.name}}<img src="../assets/order/right_arrow_h.png" /></span>
                        <span class="orderstatus">{{order.orderStatus}}</span>
                    </div>
                    <div class="order-list-item-info">
                        <div class="swipe-container">
                            <div class="swipe" :style="{'width': 6 * 80 + 'px'}">
                                <img src="../assets/order/b1.jpg" />
                                <img src="../assets/order/b1.jpg" />
                                <img src="../assets/order/b1.jpg" />
                                <img src="../assets/order/b1.jpg" />
                                <img src="../assets/order/b1.jpg" />
                                <img src="../assets/order/b1.jpg" />
                            </div>
                        </div>
                        <div class="total-info">
                            共<span class="total-info-number">1</span>件商品&nbsp;
                            实付款：<span class="total-info-price">￥50.00</span>
                        </div>
                        <div class="main-btns">
                            <div class="mark"
                                v-for="mark in order.marks"
                                :style="{color: mark.color, backgroundColor: mark.bgColor, borderColor: mark.borderColor}">{{mark.text}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import orderList from '../mock/order'

    export default {
        name: 'order',
        data () {
            return {
                orderBtns: [
                    {text: '全部订单', id: '1'},
                    {text: '待发货', id: '2'},
                    {text: '待收货', id: '3'},
                    {text: '待付款', id: '4'}
                ],
                orderList,
                type: ''
            }
        },
        created: function () {
            let t = this
            t.type = this.$route.query.type || '1'
        },
        methods: {
            changeType (id) {
                this.type = id
                window.scrollTo(0, 0)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/order.less";
</style>

