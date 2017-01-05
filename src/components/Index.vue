<template>
    <div class="index">
        <div class="grid type">
            <div class="col-3" v-for="type in typeButtons" @click="goToListPage(type)">
                <div class="img"></div>
                <div>{{type.text}}</div>
            </div>
        </div>

        <div class="promotion">
            <img src="../assets/index/ad1.jpg" />
        </div>

        <div class="grid hot-commodity">
            <h4>热门商品<img src="../assets/index/hot.png" /></h4>
            <div class="col-6" v-for="goods in Commoditys">
                <div class="commodity-img">
                    <img src="../assets/index/a1.jpg" />
                    <!--<img :src="goods.src" />-->
                </div>
                <div class="commodity-name">
                    {{goods.CommodityName}}
                </div>
                <div class="commodity-info fix">
                    <div class="commodity-info-price">
                        ￥24.11
                    </div>
                    <div class="commodity-info-shop"></div>
                </div>
            </div>

        </div>

        <div v-for="job in jobs">
            <div>
                职位：{{job.job}}
            </div>
            <!--<div>-->
                <!--薪酬：{{job.pay}}-->
            <!--</div>-->
            <!--<div>-->
                <!--待遇：{{job.lured}}-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import {router} from '../router'
//    import {config} from '../config'
    export default {
        name: 'index',
        router,
//        created: function () {
//            this.$http.get(config.url + 'jobs/list', {}).then(function (res) {
//                if (res.status === 200) {
//                    this.jobs = JSON.parse(res.body)
//                    console.log(this.jobs)
//                }
//            }, function (err) {
//                console.log(err)
//            })
//        },
        data () {
            return {
                typeButtons: [
                    {text: '美食', to: 1},
                    {text: '酒水饮料', to: 2},
                    {text: '粮油调料', to: 3},
                    {text: '日化', to: 4},
                    {text: '日用百货', to: 5},
                    {text: '速冻食品', to: 6},
                    {text: '礼品专区', to: 7},
                    {text: '所有分类', to: 8}
                ],
                Commoditys: [
                    {CommodityName: '茶人岭花草茶头采杭白菊胎菊菊花茶桶装年货茶桶装年货茶桶装年货'},
                    {CommodityName: '茶人岭花草茶头采杭白菊胎菊菊花茶桶装年货茶桶装年货茶桶装年货'},
                    {CommodityName: '茶人岭花草茶头采杭白菊胎菊菊花茶桶装年货茶桶装年货茶桶装年货'},
                    {CommodityName: '茶人岭花草茶头采杭白菊胎菊菊花茶桶装年货茶桶装年货茶桶装年货'},
                    {CommodityName: '茶人岭花草茶头采杭白菊胎菊菊花茶桶装年货茶桶装年货茶桶装年货'},
                    {CommodityName: '茶人岭花草茶头采杭白菊胎菊菊花茶桶装年货茶桶装年货茶桶装年货'},
                    {CommodityName: '茶人岭花草茶头采杭白菊胎菊菊花茶桶装年货茶桶装年货茶桶装年货'},
                    {CommodityName: '茶人岭花草茶头采杭白菊胎菊菊花茶桶装年货茶桶装年货茶桶装年货'}
                ],
                jobs: []
            }
        },
        methods: {
            goToListPage: function (type) {
                router.push({name: 'list', params: {id: type.to}})
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/util.less";
    @bg-color: #f0f0f0;
    @font-color: #000;
    .index {
        min-height: 100vh;
        background-color: @bg-color;

        .promotion{
            margin-top: 10px;

            img{
                width: 100%;
                height: 100%;
            }
        }

    }


    .type {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        background-color: #fff;
        color: @font-color;
        font-size: 14px;

        .col-3 {
            padding-top: 10px;
            padding-bottom: 10px;

            .img {
                display: inline-block;
                width: 37px;
                height: 37px;
                margin-bottom: 5px;
                background-size: 100% 100%;
            }

            &:active {
                 background-color: #d8d8d8;
             }
        }
        .col-3:nth-child(1) > .img  {
            background-image: url(../assets/index/type-1.png);
        }
        .col-3:nth-child(2) > .img  {
            background-image: url(../assets/index/type-2.png);
        }
        .col-3:nth-child(3) > .img {
            background-image: url(../assets/index/type-3.png);
        }
        .col-3:nth-child(4) > .img {
            background-image: url(../assets/index/type-4.png);
        }
        .col-3:nth-child(5) > .img {
            background-image: url(../assets/index/type-5.png);
        }
        .col-3:nth-child(6) > .img {
            background-image: url(../assets/index/type-6.png);
        }
        .col-3:nth-child(7) > .img {
            background-image: url(../assets/index/type-7.png);
        }
        .col-3:nth-child(8) > .img {
            background-image: url(../assets/index/type-8.png);
        }
    }

    .hot-commodity {
        padding: 0 10px 10px;

        h4 {
            position: relative;
            padding-left: 5px;
            line-height: 35px;
            color: #000;
            font-size: 14px;

            img {
                .vertical-middle;
                width: 32px;
                height: 15px;
                margin-left: 6px;
            }

        }

        .col-6{
            background-color: #fff;
            padding: 10px;
            margin-bottom: 6px;
        }

        .commodity-img{
            text-align: center;

            img{
                width: 90%;
            }
        }

        .commodity-name{
            height: 32px;
            margin: 5px 0;
            line-height: 16px;
            color: #343434;
            font-size: 14px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .commodity-info{
            &-price{
                float: left;
                position: relative;
                top: 5px;
                color: #12c8b9;
                font-size: 13px;

            }
            &-shop{
                float: right;
                width: 26px;
                height: 26px;
                background-size: 100% 100%;
                background-image: url(../assets/index/shopcar.png);
            }
        }
    }
</style>

