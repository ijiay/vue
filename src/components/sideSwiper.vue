<template>
    <div class="side-swipe"
         :style="{'transform': 'translateX(' + moveX + 'px)'}"
         @touchend="touchend($event)"
         @touchmove="touchmove($event)"
         @touchstart="touchstart($event)">
        <slot class="side-swipe-slot"></slot>
        <div class="side-swipe-btn-group">
            <div class="side-swipe-btn"
                 :style="{'width': btn.width, 'backgroundColor': btn.bgc}"
                 @click="btn.cb"
                 v-for="btn in btns">
                <span>{{btn.name}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../less/sideSwiper";
</style>

<script>
    export default {
        name: 'side-swipe',
        props: {
            btns: {
                validator: function (arr) {
                    // btns 必须为数组，数组中都为对象，并且每个对象都得包含name，bgc，width属性
                    return arr.every(function (btn) {
                        return (typeof btn === 'object') && !!btn.name && !!btn.bgc && !!btn.width
                    })
                }
            },
            status: {
                type: Array
            },
            touchnum: {
                type: Number
            }
        },
        data () {
            return {
                isMoved: false,    // 是否移动过
                startX: 0,          // 开始时X坐标
                endX: 0,            // 结束时X坐标
                betaX: 0,           // 每次移动时X坐标
                bateY: 0,           // 每次移动时Y坐标
                moveX: 0,           // X轴移动距离
                startY: 0,          // 开始时Y坐标
                endY: 0,            // 结束时Y坐标
                startTime: 0,       // 开始时间
                endTime: 0,         // 结束时间
                isScroll: false,    // 是否为滚动
                initSpeed: 7,       // 初始速度
                width: 0            // 总宽度
            }
        },
        computed: {
            // 向父组件传递本组件打开状态
            setStatus: {
                set: function (v) {
                    let t = this
                    if (v === 0) {
                        t.$emit('setstatus', {id: t._uid, isOpened: false})
                    }
                    if (v === -t.width) {
                        t.$emit('setstatus', {id: t._uid, isOpened: true})
                    }
                }
            }
        },
        created () {
            let t = this
            t.width = t.btns.reduce(function (pre, next) {
                return parseInt(pre.width) + parseInt(next.width)
            })
            t.$emit('setstatus', {id: t._uid, isOpened: false})
        },
        watch: {
            touchnum: function (val, oldVal) {
                let t = this
                t.move(t.initSpeed)
            }
        },
        methods: {
            // 获取实时的打开信息
            realTimeStatus () {
                let t = this
                return t.status.some(function (item) {
                    return item.isOpened && item.id !== t._uid
                })
            },
            touchstart (e) {
                let t = this
                if (t.realTimeStatus()) return
                t.startTime = Date.now()
                t.betaX = e.touches[0].pageX
                t.startX = e.touches[0].pageX
                t.startY = e.touches[0].pageY
            },
            touchmove (e) {
                let t = this
                if (t.realTimeStatus()) return
                let moveX = e.touches[0].pageX - t.betaX
                let moveY = e.touches[0].pageY - t.betaY
                t.betaX = t.endX = e.touches[0].pageX
                t.betaY = t.endY = e.touches[0].pageY
                // 如果在Y轴上移动的距离小于X轴上移动的距离,那么这就是无效移动
                if (Math.abs(moveY) > (Math.abs(moveX) * 0.8)) {
                    t.isScroll = true
                    return
                }
                e.stopPropagation()
                e.preventDefault()
                if ((t.moveX + moveX) <= 0 && (t.moveX + moveX) >= -t.width) {
                    t.moveX += moveX
                }
                t.isMoved = true
            },
            touchend () {
                let t = this
                if (t.realTimeStatus()) return

                if (!t.isMoved) {
                    t.move((t.moveX > -(t.width / 1.3)) ? 5 : -5)
                    return
                }
                // 计算每帧所花时间，从而计算速度
                t.endTime = Date.now()
                let reduce = t.endX - t.startX
                let time = t.endTime - t.startTime
                let speed = parseInt(reduce / (time / (1000 / 60)))
                if (speed > 0 && speed < t.initSpeed) {
                    speed = t.initSpeed
                }
                if (speed < 0 && speed > -t.initSpeed) {
                    speed = -t.initSpeed
                }
                t.move(speed)

                // 重置
                t.isMoved = false
                t.isScroll = false
            },
            move (speed) {
                let t = this
                window.requestAnimFrame(function () {
                    let x = t.moveX + speed
                    if (x >= 0) {
                        t.setStatus = t.moveX = 0
                        return
                    }
                    if (x <= -t.width) {
                        t.setStatus = t.moveX = -t.width
                        return
                    }
                    t.setStatus = t.moveX += speed
                    speed = speed > 0 ? (speed + 0.8) : (speed - 0.8)
                    t.move(speed)
                }, 1000 / 60)
            }
        }
    }
</script>
