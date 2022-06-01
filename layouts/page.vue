
<template>
    <div class="mainPage">
        <slot ></slot>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
</script>
<style lang="scss" scoped>
.mainPage {
    position: relative;
    background: url("@/assets/img/mainPage_bg.png");
    background-position: bottom 91% right 56%;
    background-repeat: no-repeat;
    background-size: 190%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>