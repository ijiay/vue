<template>
    <div>
        <div class="tabbtn">
            <ul>
                <li v-for="tabbtn in tabBtns">{{tabbtn.text}}</li>
            </ul>
        </div>
        <div class="content-body">
            <div class="suppliers" v-for="item in suppliers">
                <div class="suppliers-icon">
                    <img src="../assets/suppliers/suppliers.png" />
                </div>
                <div class="suppliers-info">
                    <div class="suppliers-info-title">{{item.text}}</div>
                    <div class="suppliers-info-figure">
                        <span>
                            <span>{{item.digit}}</span>次交易
                        </span>
                        <span>
                            <span>{{item.include}}</span>家进货超市
                        </span>
                    </div>
                    <ul>
                        <li class="mark"
                            v-for="mark in item.marks"
                            v-bind:style="{ borderColor: mark.borderColor, color: mark.color}">{{mark.text}}</li>
                    </ul>
                    <div class="suppliers-info-tags">
                        <div class="suppliers-info-tags-tag" v-for="tag in item.tags">
                            <span class="tag"
                                  v-bind:style="{ backgroundColor: tag.bgColor, color: tag.color}">{{tag.tag}}</span>
                            <span class="text">
                                {{tag.text}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="suppliers-operation">
                    <div class="suppliers-operation-distance">{{item.distance > 500 ? item.distance/1000 + 'km' : item.distance + 'm'}}</div>
                    <div class="suppliers-operation-collect">
                        收藏店铺
                    </div>
                </div>
            </div>
            <infinite-loading :on-infinite="onInfinite">
                <span slot="no-more">
                   - 没有更多了 -
                </span>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
//    import {router} from '../router'
    import suppliers from '../mock/suppliers'
    import InfiniteLoading from 'vue-infinite-loading'

    export default {
        name: 'suppliers',
        data () {
            return {
                tabBtns: [
                    {text: '综合排序'},
                    {text: '距离最近'},
                    {text: '销量最高'},
                    {text: '消费者保障'}
                ],
                suppliers: suppliers
            }
        },
        created: function () {
//            let t = this
//            t.suppliers = supplier
        },
        methods: {
            onInfinite () {
                setTimeout(() => {
                    const temp = []
                    for (let i = this.suppliers.length + 1; i <= this.suppliers.length + 5; i++) {
                        temp.push(i)
                    }
                    this.suppliers = this.suppliers.concat(temp)
                    this.$broadcast('$InfiniteLoading:loaded')
                    if (this.suppliers.length / 5 === 4) {
                        this.$broadcast('$InfiniteLoading:complete');
                    }
                }, 1000)
            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../less/suppliers.less";
</style>

