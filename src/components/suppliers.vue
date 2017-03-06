<template>
    <div>
        <div class="tabbtn">
            <header>
                <div class="title">供应商</div>
            </header>
            <ul>
                <li v-for="tab in tabBtns"
                    @click="changeType(tab.id)"
                    :class="{'current': tab.id == type}">{{tab.text}}</li>
            </ul>
        </div>
        <div class="content-body">
            <div class="suppliers" v-for="item in suppliersLists">
                <div class="suppliers-icon">
                    <img src="../assets/suppliers/suppliers.png" />
                </div>
                <div class="suppliers-info">
                    <div class="suppliers-info-title">{{item.name}}</div>
                    <div class="suppliers-info-figure">
                        <span>
                            <span>{{item.digit}}</span>次交易
                        </span>
                        <span>
                            <span>{{item.include}}</span>家进货超市
                        </span>
                    </div>
                    <ul>
                        <!--这里：冒号后面是一个变量或者字符串，如果只有一个消费者保障的话，我们也可以把着东西写到css里面-->
                        <li class="mark"
                            v-if="!item.is_consumer_protection">消费者保障</li>
                    </ul>
                    <div class="suppliers-info-tags">
                        <div class="suppliers-info-tags-tag" v-for="tag in item.tags">
                            <span class="tag"
                                  :style="{ backgroundColor: tag.bgColor, color: tag.color}">{{tag.tag}}</span>
                            <span class="text">
                                {{tag.text}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="suppliers-operation">
                    <div class="suppliers-operation-distance">{{item.distance > 500 ? item.distance/1000 + 'km' : item.distance + 'm'}}</div>
                    <div class="suppliers-operation-collect">
                        <div class="collect"
                             @click="collectShop(item)"
                             v-if="item.is_collect == 'False'">
                            <img src="../assets/suppliers/collect.png" />
                            <span>收藏店铺</span>
                        </div>
                        <div class="collected"
                             @click="collectShop(item)"
                             v-if="item.is_collect != 'False'">
                            <img src="../assets/suppliers/collected.png" />
                            <span>已收藏</span>
                        </div>
                    </div>
                </div>
            </div>
            <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
                <span slot="no-more">
                   - 没有更多了 -
                </span>
                <span slot="no-results">
                   - 没有更多了 -
                </span>
            </infinite-loading>
        </div>
    </div>
</template>

<script type="text/babel">
    import dataService from '../getData/index'

    export default {
        name: 'suppliers',
        data () {
            return {
                tabBtns: [
                    {text: '综合排序', id: '1'},
                    {text: '距离最近', id: '2'},
                    {text: '销量最高', id: '3'},
                    {text: '消费者保障', id: '4'}
                ],
                suppliers: [],
                suppliersLists: [],
                page_number: 1,
                type: 1
            }
        },
        computed: {
            pageNumber () {
                // 在这里它执行了这个方法，并且返回了this.page_number
                return this.page_number
            }
        },
        created: function () {
            // let t = this
            // t.suppliers = suppliers.slice(0, 5)
            // t.getSuppliers()
        },
        methods: {
            // 我给你讲一下
            // 这个方法是组件自带的方法，当页面已经滚动到底部的时候，就会开始加载
            onInfinite () {
                let t = this
                // postData 这是传给后端的数据
                let postData = {
                    // 用parseInt方法把type处理成数字
                    order: parseInt(t.type),
                    data_number: 1,
                    // 这里拿到的是一个计算属性
                    // 执行t.pageNumber的时候，它会自动跳到上面computed那里去，我们现在去那里看看
                    // 现在我们就可以知道获取pageNumber的时候，其实找到的是page_number
                    page_number: t.pageNumber
                }
                dataService.getSuppliers(postData).then(function ({data}) {
                    // 在这里我们可以知道的是suppliersLists，它是一个数组，我们需要的效果是下次请求来的数据加载在之前数据的下方
                    // 这里我们就可以用concat方法，这个方法可以连接两个数组，并把它们合成一个
                    // 这样这里的suppliersLists，最终的形态就是之前的数据+当前获取的数据
                    t.suppliersLists = t.suppliersLists.concat(data.datalist)
                    switch (data.code) {
                        case 199:
                            // 在这里，我们告诉组件  这次加载已经结束，可以休息一下等待下次滚动到底部的时候加载
                            t.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
                            break
                        case 511:
                            // 这里的我知道
                            t.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
                            break
                        default:
                            window.alert(data.msg)
                            break
                    }
                })
                // 在这里，当我们已经发送了ajax请求之后，把page_number加1，这样的话，下次进来获取到的就是2了
                t.page_number++
            },
            getSuppliers: function () {
                let t = this
                t.suppliersLists = []
                t.page_number = 1
                // 就是这一句
                // 这个就是让组件初始化，回到最初始的状态
                // 这样它就又去执行那个循环的方法了，我想知道收藏的怎么写
                t.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            },
            // 这个我也了解，你跟我讲过
            changeType (id) {
                this.type = id
                window.scrollTo(0, 0)
                this.getSuppliers()
            },
            collectShop (shop) {
                // 这里还需要掉接口的，接口返回数据之后，才能告诉用户收藏成功或者取消收藏成功，是提示框什么的是么，是的
                // 那我想知道的是假如收藏成功后变成true，这样是不是还需要把这个值传出去，接口设计的好的话，我们只需要把shop的ID传过去就可以了
                // 后端自动判断，自动修改，ok，我把消费者保障做一下，等我做一下
                shop.is_collect = shop.is_collect === 'False' && 'True' || 'False'
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/suppliers.less";
</style>

