<template>
    <div class="order order-detail">
        <div class="order-tabbtn order-detail-btn">
            <header class="order-header order-detail-header">
                <div class="left-arrow" @click="goToOrderPage(order)"></div>
                <div class="title">订单详情</div>
            </header>
        </div>
        <div class="order-detail-body">
            <div class="order-number">
                <img src="../assets/order/order-icon.png" />
                <span></span>
            </div>
            <div class="order-detail-info">
                <div class="">
                    <div class="consignee">
                        收件人：<span>aaa</span>
                    </div>
                    <div class="tel-number">
                        15896432158
                    </div>
                </div>

                <div class="address">
                    北京市中关村善缘街立方庭2-228
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import {router} from '../router'

    export default {
        name: 'order-detail',
        router,
        methods: {
            goToOrderPage: function (value) {
                router.push({name: 'order'})
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/Order.less";
    @import "../less/order-detail.less";
</style>

