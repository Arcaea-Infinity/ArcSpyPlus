
<template>
    <div class="mainPage">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.mainPage {
    position: relative;
    background: url("@/assets/img/mainPage_bg.webp");
    background-position: bottom 91% right 56%;
    background-repeat: no-repeat;
    background-size: 190%;
    background-color: #C3C4D0;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    // .mainPage_bg {
    //     object-fit: cover;
    //     position: absolute;
    //     width: 100vw;
    //     height: 100vh;
    //     z-index: 0;
    // transform: translateY(40%);
    // }
}
</style>