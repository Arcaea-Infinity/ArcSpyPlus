
<template>
    <div class="switchType" :style="`padding:0 ${left}`">
        <div class="switchType_tab" :class="current == 0 ? 'switchType-left' : 'switchType-right'">
            <div class="switchBtn account_info" :class="{ switchBtnCurrent: current == 0 }"
                @click.stop="updateSwitch(0)">
                RECENT</div>
            <div class="switchBtn acount_B30" :class="{ switchBtnCurrent: current == 1 }" @click.stop="updateSwitch(1)">
                BEST40</div>
        </div>
        <div class="account_PPT" :style="`right:max(8px,${left})`">
            <img :src="userDetali.rating_bg" alt="PPT图片加载失败" />
            <span style="font-size:32px">
                {{ insertStr(`${userDetali?.rating}`, 2, ".").slice(0, 2) }}
            </span>
            <span>
                {{ insertStr(`${userDetali?.rating}`, 2, ".").slice(2) }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { account_info } from '@/composables/search';

interface Prop {
    left: string;
    userDetali: account_info;
    current: number;
}
defineProps<Prop>();
const emit = defineEmits<{
    (event: 'update:current', sum: number): void
}>()
function updateSwitch(e: number) {
    emit("update:current", e)
    // currentswitch.value = e
}
function insertStr(soure: string, start: number, newStr: string) {
    let newSoure = soure.split("").reverse().join("")
    return `${newSoure.slice(0, start)}${newStr}${newSoure.slice(start)}`.split("").reverse().join("")
}
</script>
<style lang="scss" scoped>
.switchType {
    display: flex;
    justify-content: flex-start;
    position: relative;
}

.switchType_tab {
    position: relative;
    display: flex;

    &::after {
        content: "";
        position: absolute;
        width: calc(50% - 12px);
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 20px 20px 0px 0px;
        box-shadow: 5px 6px 3px 0 hsl(0deg 0% 57% / 40%);
        background-color: #FFF;
        color: #FFF;
        transition: left 0.19s, transform 0.19s;
    }
}

.switchType-right {
    &::after {
        transform: translateX(calc(100% + 20px));
    }
}

.switchBtn {
    text-align: center;
    width: 110px;
    color: #FFF;
    border-radius: 20px 20px 0px 0px;
    background-color: transparent;
    padding: 7px 20px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    z-index: 1;
}





.switchBtnCurrent {
    color: #5C5997 !important;
}

.account_info {
    margin-right: 12px;


}

@media screen and (max-width:500px) {
    .account_PPT {
        transform: translateY(0%) !important;

        span {

            -webkit-text-stroke: 1px #42406E;
        }
    }
}

.account_PPT {
    position: absolute;
    top: 0;
    right: 32px;
    transform: translateY(-50%);

    span {
        letter-spacing: 2px;
        position: relative;
        z-index: 10;
        color: #fff;
        font-size: 22px;
        font-family: "Exo";
        font-weight: 700;
    }

    img {
        position: absolute;
        z-index: 5;
        width: min(90px, 20vmin);
        object-fit: cover;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -45%);
    }

}
</style>