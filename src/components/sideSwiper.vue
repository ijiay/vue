<template>
    <div class="side-swipe"
         @touchend="touchend($event)"
         @touchmove="touchmove($event)"
         @touchstart="touchstart($event)">
        <slot class="side-swipe-slot"></slot>
        <div class="side-swipe-btn-group">
            <div class="side-swipe-btn">
                <span>按钮1</span>
            </div>
            <div class="side-swipe-btn">
                <span>按钮2</span>
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
        methods: {
            touchstart ($event) {
                console.log(1, $event)
            },
            touchmove ($event) {
                console.log(2, $event)
            },
            touchend ($event) {
                console.log(3, $event)
            }
        }
    }
</script>
