<template>
    <NuxtLayout name="page">
        <main class="searchMask column">
            <header class="between align-center userInfo">
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
            </header>
            <div class="switchType">
                <div class="switchBtn account_info" @click="updateSwitch(0)"
                    :class="{ switchBtnCurrent: currentswitch === 0 }">RECENT</div>
                <div class="switchBtn acount_B30" @click="updateSwitch(1)"
                    :class="{ switchBtnCurrent: currentswitch === 1 }">BEST30</div>
            </div>
            <ul class="songList">
                <li class="song" v-for="item in songList" :key="item.time_played">
                    {{ item.song_id }}
                </li>
            </ul>
        </main>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import search_Account from "~~/composables/search";

const route = useRoute();
const search = new search_Account(route.query.ArcId as string);
await search.onCreated()
const B30 = await search.getUserB30();
const userDetali = search.getAccount_info()
const songList = search.getSongList();
const currentswitch = ref<number>(0)

function insertStr(soure: string, start: number, newStr: string) {
    let newSoure = soure.split("").reverse().join("")
    return `${newSoure.slice(0, start)}${newStr}${newSoure.slice(start)}`.split("").reverse().join("")
}
function updateSwitch(e: number) {
    currentswitch.value = e
}
</script>
<style lang="scss" scoped>
.switchType {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
}

.songList {
    flex: 1;
    overflow-y: auto;
    height: 72vh;
    padding: 0px 32px;

    .song {
        height: 30%;
        border-radius: 30px;
        background-color: #FFFFFF;
        margin-bottom: 12px;
    }

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

.switchBtn {
    color: #5C5997;
    border-radius: 20px;
    background-color: transparent;
    padding: 7px 20px;
    font-weight: 500;
    cursor: pointer;
}

.switchBtnCurrent {
    color: #5C5997 !important;
    background-color: #ffffff !important;
    box-shadow: 5px 6px 3px 0 rgba(145, 145, 145, 0.4);
}

.account_info {
    margin-right: 12px;
}

.acount_B30 {}
</style>