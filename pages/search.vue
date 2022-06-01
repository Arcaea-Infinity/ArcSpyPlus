<template>
    <NuxtLayout name="page">
        <div class="searchMask column">
            <div class="between align-center userInfo">
                <div class="column ">
                    <div class="userName">{{ userDetali.name }}</div>
                    <div>
                        ArcID {{ userDetali.code }}
                    </div>
                    <div>
                        Join Date {{ new Date(userDetali.join_date).toLocaleDateString() }}
                    </div>
                </div>
                <div>
                    PPT:{{ insertStr(`${userDetali.rating}`, 2, ".") }}
                </div>
            </div>
            <ul class="songList">
                <li v-for="item in songList" :key="item.time_played">
                    <div>
                        你最近玩的歌曲 应该是吧 大嘘(x
                    </div>
                    {{ item.song_id }}
                </li>
            </ul>
        </div>
    </NuxtLayout>
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
const songList = ref<SearchValue["content"]["recent_score"]>([])
const route = useRoute();
if (typeof route.query.ArcId === "string" && route.query.ArcId.length > 0) {
    try {
        const { data: result } = await useFetch<SearchValue>(
            `https://server.awbugl.top/botarcapi/user/info?user=${route.query.ArcId.replaceAll(" ", "")}`,
            {
                headers: {
                    "user-agent": "ArcSpy3S2D2G1L2JB2F0"
                }
            }
        );
        // const result = data.value
        // : SearchValue
        // : 
        if (result.value.status === 0 && result.value.content.account_info) {
            userDetali.value = result.value.content.account_info
            songList.value = result.value.content.recent_score ?? []
        }
    } catch (error) {

    }

}
function insertStr(soure: string, start: number, newStr: string) {
    return soure.slice(0, start) + newStr + soure.slice(start);
}
//     result.value = JSON.stringify(newresult)
//     console.log(result, "我是查询到的结果")
// } else {
//     window.location.replace(window.location.origin)
// }

</script>
<style lang="scss" scoped>
.songList {
    flex: 1;
    overflow-y: auto;
    height: 72vh;

    &::-webkit-scrollbar {
        display: none;
    }
}

.userInfo {
    padding: 10vmin;
    font-size: 17px;
    font-family: "Kazesawa";
    color: #1F1F32;
    font-weight: 500;

    .userName {
        font-weight: 600;
        font-size: min(55px, 8vmin);
    }
}

.searchMask {
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>