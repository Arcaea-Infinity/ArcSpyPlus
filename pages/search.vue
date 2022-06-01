<template>
    <div>
        {{ JSON.stringify(userDetali) }}
    </div>
</template>

<script lang="ts" setup>

interface RecentScoreType {
    score: number;
    health: number;
    rating: number;
    song_id: string;
    modifier: number;
    difficulty: number;
    clear_type: number;
    best_clear_type: number;
    time_played: number;
    near_count: number;
    miss_count: number;
    perfect_count: number;
    shiny_perfect_count: number;
}

interface SearchValue {
    status: number;
    message: 0 | -1 | -3 | -4;
    content?: {
        account_info: {
            code: string;
            name: string;
            user_id: number;
            is_mutual: boolean;
            is_char_uncapped_override: boolean;
            is_char_uncapped: boolean;
            is_skill_sealed: boolean;
            rating: number;
            join_date: number;
            character: number;
        };
        recent_score: RecentScoreType[];
    };
}
const userDetali = ref<SearchValue["content"]["account_info"]>()
const route = useRoute();
if (typeof route.query.ArcId === "string" && route.query.ArcId.length > 0) {
    try {
        const result: SearchValue = await $fetch(
            `https://server.awbugl.top/botarcapi/user/info?user=${route.query.ArcId}`,
            {
                headers: {
                    "user-agent": "ArcSpy3S2D2G1L2JB2F0"
                }
            }
        );
        if (result.status === 0 && result.content.account_info) {
            userDetali.value = result.content.account_info
        }
    } catch (error) {

    }

}
//     result.value = JSON.stringify(newresult)
//     console.log(result, "我是查询到的结果")
// } else {
//     window.location.replace(window.location.origin)
// }

</script>
<style lang="scss" scoped>
</style>