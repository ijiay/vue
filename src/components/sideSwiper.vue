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
                moveX: 0,
                startTime: 0,
                endTime: 0,
                isOpen: false
            }
        },
        created () {
            console.log(this._uid)
        },
        methods: {
            touchstart (e) {
                let t = this
                t.startTime = Date.now()
                t.isOpen = t.moveX <= -110
                t.betaX = e.touches[0].pageX
                t.startX = e.touches[0].pageX
                console.log(t.startX)
            },
            touchmove (e) {
                let t = this
                let moveX = e.touches[0].pageX - t.betaX
                t.betaX = t.endX = e.touches[0].pageX
                if ((t.moveX + moveX) <= 0 && (t.moveX + moveX) >= -130) {
                    t.moveX += moveX
                }
                t.isMoved = true
            },
            touchend () {
                let t = this
                if (!t.isMoved) return
                t.isMoved = false
                t.endTime = Date.now()
                let reduce = t.endX - t.startX
                let time = t.endTime - t.startTime
                let speed = parseInt(reduce / (time / (1000 / 60)))
                if (speed > 0 && speed < 5) {
                    speed = 5
                }
                if (speed < 0 && speed > -5) {
                    speed = -5
                }
                let animate = function () {
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
                        speed > 0 ? (speed++) : (speed--)
                        animate()
                    }, 1000 / 60)
                }
                animate('reduce')
            }
        }
    }
</script>
