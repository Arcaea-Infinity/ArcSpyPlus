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
                <div class="account_PPT">
                    <img :src="userDetali.rating_bg" alt="PPT图片加载失败" />
                    <span style="font-size:26px">
                        {{ insertStr(`${userDetali?.rating}`, 2, ".").slice(0, 2) }}
                    </span>
                    <span>
                        {{ insertStr(`${userDetali?.rating}`, 2, ".").slice(2) }}
                    </span>
                </div>
            </header>
            <div class="switchType" :class="currentswitch === 0 ? 'switchBtnCurrent-left' : 'switchBtnCurrent-right'">
                <div class="switchBtn account_info" :class="{ switchBtnCurrent: currentswitch === 0 }"
                    @click="updateSwitch(0)">RECENT</div>
                <div class="switchBtn acount_B30" :class="{ switchBtnCurrent: currentswitch === 1 }"
                    @click="updateSwitch(1)">BEST30</div>
            </div>
            <ul class="songList" v-show="currentswitch === 0">
                <li class="song" v-for="item in songList" :key="item.time_played">
                    {{ item.song_id }}
                </li>
            </ul>
            <ul class="songList" v-show="currentswitch === 1">
                <li class="song" v-for="item in B30" :key="item.time_played">
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
    width: auto;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        width: calc(50% - 6px);
        height: 100%;
        border-radius: 20px;
        box-shadow: 5px 6px 3px 0 hsl(0deg 0% 57% / 40%);
        background-color: #FFF;
        transition: left 0.19s, transform 0.19s;
    }
}

.switchBtnCurrent-left {
    &::after {
        left: 0;
    }
}

.switchBtnCurrent-right {
    &::after {
        // width: 50% !important;
        left: 100%;
        transform: translateX(-100%);
        // right: 0;
    }
}

.songList {
    flex: 1;
    overflow-y: auto;
    height: 72vh;
    padding: 0px 32px;

    .song {
        height: 30%;
        border-radius: 20px;
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
    position: relative;
    z-index: 1;
}

.switchBtnCurrent {
    color: #5C5997 !important;
}

.account_info {
    margin-right: 12px;
}

.account_PPT {
    position: relative;
    transform: translateY(30%);

    span {
        position: relative;
        z-index: 10;
        color: #FFF;
        -webkit-text-stroke: 1px #42406E;
        font-size: 18px;
        font-family: "Exo";
        font-weight: 600;
    }

    img {
        position: absolute;
        z-index: 5;
        width: 20vmin;
        object-fit: cover;
        transform: translateY(-23%) translate(-15%);
    }

}
</style>