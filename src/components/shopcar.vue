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
                <div class="sup-item">
                    <div class="sup-item-title">
                        <input type="checkbox"  class="sub-check">
                        <img src="../assets/shopcar/shop.png" class="sub-icon">
                        <span>北京宏达贸易有限公司</span>
                        <span class="right-arrow"></span>
                    </div>
                    <div class="sup-item-list">
                        <div class="goods-item">
                            <div class="goods-item-check">
                                <input type="checkbox" class="check">
                            </div>
                            <div class="img">
                                <img src="../assets/shopcar/a1.jpg" />
                            </div>
                            <div class="info">
                                <div class="title">
                                    <a>香港虎标苦荞茶原味</a>
                                </div>
                                <div class="detail">7g*1/袋</div>
                                <div class="other">
                                    <div class="price">￥28.50</div>
                                    <div class="num-btn">
                                        <div class="reduce disabled"></div>
                                        <input type="number"
                                               value="1"
                                               class="number"/>
                                        <div class="add"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="goods-item">
                            <div class="goods-item-check">
                                <input type="checkbox" class="check">
                            </div>
                            <div class="img">
                                <img src="../assets/shopcar/a1.jpg" />
                            </div>
                            <div class="info">
                                <div class="title">
                                    <a>红糖姜茶 12g/盒单条装 速溶姜茶 姜汤</a>
                                </div>
                                <div class="detail">7g*1/袋</div>
                                <div class="other">
                                    <div class="price">￥5.50</div>
                                    <div class="num-btn">
                                        <div class="reduce disabled"></div>
                                        <input type="number"
                                               value="1"
                                               class="number"/>
                                        <div class="add"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sup-item-footer">
                        <div class="starting-price">
                            <span>起送价：</span>
                            <span>￥300.00</span>
                        </div>
                        <div class="sup-item-total">
                            <span>合计：</span>
                            <span class="sup-item-total-price">￥16.50</span>
                        </div>
                    </div>
                </div>
                <div class="sup-item">
                    <div class="sup-item-title">
                        <input type="checkbox"  class="sub-check">
                        <img src="../assets/shopcar/shop.png" class="sub-icon">
                        <span>北京宏达贸易有限公司</span>
                        <span class="right-arrow"></span>
                    </div>
                    <div class="sup-item-list">
                        <div class="goods-item">
                            <div class="goods-item-check">
                                <input type="checkbox" class="check">
                            </div>
                            <div class="img">
                                <img src="../assets/shopcar/a1.jpg" />
                            </div>
                            <div class="info">
                                <div class="title">
                                    <a>香港虎标苦荞茶原味</a>
                                </div>
                                <div class="detail">7g*1/袋</div>
                                <div class="other">
                                    <div class="price">￥28.50</div>
                                    <div class="num-btn">
                                        <div class="reduce disabled"></div>
                                        <input type="number"
                                               value="1"
                                               class="number"/>
                                        <div class="add"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="goods-item">
                            <div class="goods-item-check">
                                <input type="checkbox" class="check">
                            </div>
                            <div class="img">
                                <img src="../assets/shopcar/a1.jpg" />
                            </div>
                            <div class="info">
                                <div class="title">
                                    <a>红糖姜茶 12g/盒单条装 速溶姜茶 姜汤</a>
                                </div>
                                <div class="detail">7g*1/袋</div>
                                <div class="other">
                                    <div class="price">￥5.50</div>
                                    <div class="num-btn">
                                        <div class="reduce disabled"></div>
                                        <input type="number"
                                               value="1"
                                               class="number"/>
                                        <div class="add"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sup-item-footer">
                        <div class="starting-price">
                            <span>起送价：</span>
                            <span>￥300.00</span>
                        </div>
                        <div class="sup-item-total">
                            <span>合计：</span>
                            <span class="sup-item-total-price">￥16.50</span>
                        </div>
                    </div>
                </div>
                <div class="shopcar-list-footer">
                    <div class="shopcar-list-shopping" v-if="shopCarState == 'shopping'">
                        <div class="shopcar-list-btn">
                            <input type="checkbox"
                                   id="shoppingCheck"
                                   class="shopcar-list-check">
                            <label class="check-label" for="shoppingCheck"></label>
                            <span>全选</span>
                            <div class="shopcar-list-total">合计:<span>￥16.50</span></div>
                        </div>
                        <div class="settlement">结算(<span>2</span>)</div>
                    </div>
                    <div class="shopcar-list-shopping" v-if="shopCarState == 'edit'">
                        <div class="shopcar-list-btn edit">
                            <input type="checkbox"  class="shopcar-list-check">
                            <span>全选</span>
                        </div>
                        <div class="shopcar-list-collect">加入收藏</div>
                        <div class="settlement">删除</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'shopCar',
        data () {
            return {
                /** none指的是购物车为空，edit为编辑状态，shopping为有商品时状态
                 */
                shopCarState: 'shopping'
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/shopcar.less";
</style>

