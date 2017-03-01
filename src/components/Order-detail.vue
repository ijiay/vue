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
                <span>订单号：<span class="number">1111111</span></span>
                <span class="order-status">待付款</span>
            </div>
            <div class="order-detail-info">
                <div class="contact-info">
                    <div class="consignee">
                        收件人：<span>收件人</span>
                    </div>
                    <div class="tel-number">
                        15896432158
                    </div>
                </div>
                <div class="address">
                    北京市中关村善缘街立方庭2-228
                </div>
            </div>
            <div class="order-list-item" style="margin-bottom: 0">
                <div class="title">
                    <img src="../assets/order/trademark.png" class="order-icon">
                    <span class="title-text">北京市红海华谊科技<img src="../assets/order/right_arrow_h.png" /></span>
                </div>
                <div class="order-goods-item">
                    <div class="order-goods-item-info">
                        <div class="goods-item-img">
                            <img src="../assets/order/b1.jpg"/>
                        </div>
                        <div class="goods-item-text">
                            <div class="goods-item-text-info">
                                <div class="goods-item-text-title">香港虎标苦荞茶原味11</div>
                                <div class="goods-item-text-spec">7g*1/袋</div>
                            </div>
                            <div class="goods-item-text-price">￥28.50</div>
                        </div>
                        <div class="goods-item-num">
                            x2000
                        </div>
                    </div>
                    <div class="order-goods-item-info">
                        <div class="goods-item-img">
                            <img src="../assets/order/b1.jpg"/>
                        </div>
                        <div class="goods-item-text">
                            <div class="goods-item-text-info">
                                <div class="goods-item-text-title">香港虎标苦荞茶原味22香港虎标苦荞茶原味22香港虎标苦荞茶原味22</div>
                                <div class="goods-item-text-spec">7g*1/袋</div>
                            </div>
                            <div class="goods-item-text-price">￥26.50</div>
                        </div>
                        <div class="goods-item-num">
                            x2
                        </div>
                    </div>
                    <a class="contact-seller" href="13410909850">
                        <img src="../assets/order/order-icon1.png" />
                        <span>拨打卖家电话</span>
                    </a>
                </div>
                <div class="order-list-item-bottom">
                    <div class="discount">
                        <span>优惠：</span>
                        <span>￥6.50</span>
                    </div>
                    <div class="total-commodity">
                        <span>商品总额：</span>
                        <span>￥126.50</span>
                    </div>
                    <div class="payment">
                        <div class="payment-price">
                            需付款：<span class="price">¥333.20</span>
                        </div>
                        <div class="payment-order-time">
                            下单时间：2017-02-14 20:52:23
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-detail-footer">
                <div class="leftarea">
                    <div>
                        付款剩余时间：
                    </div>
                    <div>
                        <span>01</span>小时
                        <span>29</span>分钟
                    </div>
                </div>
                <div class="rightarea">
                    <span>取消订单</span>
                    <span>去付款</span>
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
    @import "../less/order.less";
    @import "../less/order-detail.less";
</style>

