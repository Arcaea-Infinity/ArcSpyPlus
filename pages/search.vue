<template>
    <NuxtLayout name="page">
        <div class="searchMask column">
            <div class="between align-center userInfo">
                <div class="column ">
                    <div class="userName">{{ userDetali?.name }}</div>
                    <div>
                        ArcID {{ userDetali?.code }}
                    </div>
                    <div>
                        Join Date {{ new Date(userDetali?.join_date).toLocaleDateString().replaceAll("/", "-") }}
                    </div>
                </div>
                <div>
                    PPT:{{ insertStr(`${userDetali?.rating}`, 2, ".") }}
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
import search_Account from "~~/composables/search";

const route = useRoute();
function insertStr(soure: string, start: number, newStr: string) {
    let newSoure = soure.split("").reverse().join("")
    return `${newSoure.slice(0, start)}${newStr}${newSoure.slice(start)}`.split("").reverse().join("")
}
const search = new search_Account(route.query.ArcId as string);
await search.onCreated()
const userDetali = search.getAccount_info()
const songList = search.getSongList();
console.log(userDetali)



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
    background-color: rgba(0, 0, 0, 0.2);
}
</style>