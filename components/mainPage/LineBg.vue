
<template>
    <div>
        <span class="line line-1"></span>
        <span class="line line-2"></span>
        <span class="line line-3"></span>
        <span class="line line-4"></span>
        <span class="line line-5"></span>
    </div>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
/* 这是一个随机生成长度的函数 */

@function randomNum($min, $max) {
    $rand: random();
    $randomNum: $min +floor($rand * (($max - $min) + 1));
    @return $randomNum;
}

@keyframes rainSports {
    from {
        transform: rotate(147deg) translateX(calc(-100vw - 100%));
    }

    to {
        transform: rotate(147deg) translateX(calc(100vw + 100%));
    }
}

.line {
    position: absolute;
    z-index: 1;
    background-color: #A2A1AA;
    height: 1px;
    transform: rotate(147deg);
    width: #{randomNum(20, 70)}vmin;
}

.line-1 {
    width: #{randomNum(40, 90)}vmin;
    top:#{randomNum(10, 100)}vh;
    left:#{randomNum(0, 50)}vw; 
    opacity: #{randomNum(0.4, 1)};
    animation: rainSports #{randomNum(1.3, 2.3)}s infinite forwards;
}

.line-2 {
    width: #{randomNum(40, 90)}vmin;
    top:#{randomNum(10, 100)}vh;
    opacity: #{randomNum(0.4, 1)};
    left:#{randomNum(0, 50)}vw;
    animation: rainSports #{randomNum(1.3, 2.3)}s infinite forwards;

}

.line-3 {
    width: #{randomNum(40, 90)}vmin;
    opacity: #{randomNum(0.4, 1)};
    top:#{randomNum(10, 100)}vh;
    left:#{randomNum(0, 50)}vw;
    animation: rainSports #{randomNum(1.3, 2.3)}s infinite forwards;
}

.line-4 {
    width: #{randomNum(40, 90)}vmin;
    top:#{randomNum(10, 100)}vh;
    opacity: #{randomNum(0.4, 1)};
    left:#{randomNum(0, 50)}vw;
    animation: rainSports #{randomNum(1.3, 2.3)}s infinite forwards;

}

.line-5 {
    width: #{randomNum(40, 90)}vmin;
    top:#{randomNum(10, 100)}vh;
    opacity: #{randomNum(0.4, 1)};
    left:#{randomNum(0, 50)}vw;
    animation: rainSports #{randomNum(1.3, 2.3)}s infinite forwards;

}
</style>