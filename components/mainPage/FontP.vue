
<template>
    <div class="mainPageTextP">
        <!-- <img src="@/assets/img/p/Layer_8.svg" class="" alt="" />
        <img src="@/assets/img/p/Layer_9.svg" class="" alt="" />-->
        <span class="mainPageTextP-o">
            <img src="@/assets/img/p/Layer_7.webp" class="mainPageTextP-7" alt="眉毛" />
            <span class="mainPageTextP-eye"></span>
            <img src="@/assets/img/p/Layer_4.webp" class="mainPageTextP-4" alt="" />
        </span>

    </div>
</template>

<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.mainPageTextP {
    height: 100%;
    left: 57%;
    position: absolute;
    top: 0;
    width: 19%;

    // img {
    //     object-fit: cover;
    // }

    .mainPageTextP-o {
        border: 5px solid #1f1e33;
        border-radius: 50%;
        font-weight: 400;
        height: 30px;
        left: 9px;
        line-height: 33px;
        position: absolute;
        top: 13px;
        width: 30px;

        .mainPageTextP-7 {
            position: absolute;
            top: 0;
            left: 0;
            transform: translateY(-80%) translateX(-20%);
            width: 150%;

        }

        .mainPageTextP-eye {
            position: absolute;
            top: 20%;
            left: 100%;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #34384D;
            transform: translateX(-97%);
        }

        .mainPageTextP-4 {
            position: absolute;
            height: 50px;
            bottom: 0;
            left: 0;
            transform: translateY(52%) translateX(-35%);
        }

    }



}
</style>