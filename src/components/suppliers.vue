<template>
    <div>
        <div class="tabbtn">
            <ul>
                <li v-for="tab in tabBtns"
                    @click="changeType(tab.id)"
                    :class="{'current': tab.id == type}">{{tab.text}}</li>
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
                            :style="{ borderColor: mark.borderColor, color: mark.color}">{{mark.text}}</li>
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
                        收藏店铺
                    </div>
                </div>
            </div>
            <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
                <span slot="no-more">
                   - 没有更多了 -
                </span>
            </infinite-loading>
        </div>
    </div>
</template>

<script type="text/babel">
//    import {router} from '../router'
    import suppliers from '../mock/suppliers'
    import InfiniteLoading from 'vue-infinite-loading'

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
                type: ''
            }
        },
        created: function () {
            let t = this
            t.suppliers = suppliers.slice(0, 5)
            t.type = this.$route.query.type || '1'
        },
        methods: {
            onInfinite () {
                setTimeout(() => {
                    let temp = []
                    for (let i = this.suppliers.length; i < this.suppliers.length + 5; i++) {
                        if (suppliers[i]) {
                            temp.push(suppliers[i])
                        }
                    }
                    this.suppliers = this.suppliers.concat(temp)
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')

                    if (temp.length < 5 || this.suppliers.length === suppliers.length) {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
                    }
                }, 1000)
            },
            changeType (id) {
                this.type = id
                window.scrollTo(0, 0)
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

