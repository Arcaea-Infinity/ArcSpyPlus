<template>
    <div>
        <!-- {{ result }} -->
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
// console.log(route.params)
if (typeof route.query.ArcId === "string" && route.params.ArcId.length > 0) {
    try {
        const newresult = $fetch(
            `https://server.awbugl.top/botarcapi/user/info?user=${route.query.ArcId}`,
            {
                headers: {
                    "user-agent": "ArcSpy3S2D2G1L2JB2F0"
                }
            }
        );
        console.log(newresult)
    } catch (error) {

    }

}
//     result.value = JSON.stringify(newresult)
//     console.log(result, "我是查询到的结果")
// } else {
//     window.location.replace(window.location.origin)
// }

</script>
<style lang="less" scoped>
</style>