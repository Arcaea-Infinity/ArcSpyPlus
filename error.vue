<template>
    <div class="Error">
        <h1>{{ msg }}</h1>
        <img src="@/assets/img/Error_2.webp" alt="错误的光光图片" />
        <button @click="ReturnHomo">返回查询首页</button>
    </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
const msg = ref<string>("亲亲,你输入的ArcId或者名称我们查询不到记录捏")
const error: Ref<any> = useError();
if (error.value) {
    const message: string = error.value.url.toLowerCase()
    if (message.indexOf("arcaea") !== -1) {
        msg.value = "亲亲,请不要查官方Id,因为根本查不到的捏"
    }
}
console.log(error)
function ReturnHomo() {
    window.location.replace(window.location.origin);
}
</script>
<style lang="scss" scoped>
.Error {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background-image: url("@/assets/img/Error_bg.jpg") ;
    // background-repeat: no-repeat;
    // background-size: auto 100%;
    h1 {
        font-weight: 500;
        font-size: 5vmin;
        padding: 0 16px;
    }

    button {
        border: none;
        background-color: #00DC82;
        font-size: 3vmin;
        color: #fff;
        border-radius: 4px;
        padding: 12px 32px;
        font-weight: 400;
        cursor: pointer;
    }

    img {
        margin: 40px 0 ;
        // max-width: 100vw;
        max-width: 500px;
        height: 50vh;
        max-height: 80vh;
        object-fit: cover;
    }
}
</style>