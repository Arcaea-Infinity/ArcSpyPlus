
<template>
    <!-- :style="{ backgroundImage: `url(${bg})` }" -->
    <div class="mainPage">
        <!-- <img class="mainPage_bg" src="@/assets/img/mainPage_bg.png" alt=""> -->
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
// import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
// import { bg } from "@/assets/img/preload"
</script>
<style lang="scss" scoped>
.mainPage {
    position: relative;
    background: url("@/assets/img/mainPage_bg.png");
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