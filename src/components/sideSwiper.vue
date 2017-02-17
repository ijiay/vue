<template>
    <div class="side-swipe"
         :style="{'transform': 'translateX(' + moveX + 'px)'}"
         @touchend="touchend($event)"
         @touchmove="touchmove($event)"
         @touchstart="touchstart($event)">
        <slot class="side-swipe-slot"></slot>
        <div class="side-swipe-btn-group">
            <div class="side-swipe-btn">
                <span>加入收藏</span>
            </div>
            <div class="side-swipe-btn">
                <span>删除</span>
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
        data () {
            return {
                isMoved: false,
                startX: 0,
                endX: 0,
                betaX: 0,
                bateY: 0,
                moveX: 0,
                startY: 0,
                endY: 0,
                startTime: 0,
                endTime: 0,
                isOpen: false,
                isScroll: false
            }
        },
//        created () {
//            console.log(this._uid)
//        },
        methods: {
            touchstart (e) {
                let t = this
                t.startTime = Date.now()
                t.isOpen = t.moveX <= -110
                t.betaX = e.touches[0].pageX
                t.startX = e.touches[0].pageX
                t.startY = e.touches[0].pageY
            },
            touchmove (e) {
                let t = this
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
                if ((t.moveX + moveX) <= 0 && (t.moveX + moveX) >= -130) {
                    t.moveX += moveX
                }
                t.isMoved = true
            },
            touchend () {
                let t = this
                if (!t.isMoved) {
                    t.move((t.moveX > -(130 / 1.3)) ? 5 : -5)
                    return
                }

                // 计算每帧所花时间，从而计算速度
                t.endTime = Date.now()
                let reduce = t.endX - t.startX
                let time = t.endTime - t.startTime
                let speed = parseInt(reduce / (time / (1000 / 60)))
                if (speed > 0 && speed < 7) {
                    speed = 7
                }
                if (speed < 0 && speed > -7) {
                    speed = -7
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
                        t.moveX = 0
                        return
                    }
                    if (x <= -130) {
                        t.moveX = -130
                        return
                    }
                    t.moveX += speed
                    speed = speed > 0 ? (speed + 0.8) : (speed - 0.8)
                    t.move(speed)
                }, 1000 / 60)
            }
        }
    }
</script>
