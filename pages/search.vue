<template>
    <NuxtLayout name="page">
        <main class="searchMask column">
            <header class="between align-center userInfo" v-once>
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
            <div class="switchType" :class="currentswitch == 0 ? 'switchBtnCurrent-left' : 'switchBtnCurrent-right'">
                <div class="switchBtn account_info" :class="{ switchBtnCurrent: currentswitch == 0 }"
                    @click.stop="updateSwitch(0)">RECENT</div>
                <div class="switchBtn acount_B30" :class="{ switchBtnCurrent: currentswitch == 1 }"
                    @click.stop="updateSwitch(1)">BEST30</div>
            </div>
            <div class="song-carousel" :class="{ 'SongList-B30Show': currentswitch == 1 }">
                <div class="ScrollBox">
                    <ul class="songList">
                        <li class="song" :class="`song-${isColorDarkOrLight(item.theme_color)}`"
                            v-for="item in songList" :key="item.time_played">
                            <div class="songCard-BgBox">

                                <div class="songCard-bg-shadowBox"
                                    :style="item.theme_color ? `background:rgba(${item.theme_color.join(',')},0.54)` : ''">
                                </div>
                                <div class="songCard-bg-shadowBox-right"
                                    :style="item.theme_color ? `background:rgba(${item.theme_color.join(',')},0.54)` : ''">
                                    <img :src="`https://server.awbugl.top/botarcapi/assets/song?songid=${item.song_id}`"
                                        alt="图片加载失败" />
                                </div>

                            </div>
                            <div class="songCard">
                                <span class="songId">{{ item.song_id }}</span>
                                <div class="song-Line">
                                    <span>
                                        <span class="song-Line-label">PUREs&nbsp;&nbsp;</span>
                                        <span class="song-Line-value">
                                            {{ item.perfect_count }}
                                            ({{ item.shiny_perfect_count }})</span>
                                    </span>
                                    <span style="margin-left:  auto;margin-right:30%;">
                                        <span class="song-Line-label">FARs&nbsp;&nbsp;</span>
                                        <span class="song-Line-value">{{ item.near_count }}</span>
                                    </span>
                                </div>
                                <div class="song-Line" style="margin-top:20px;margin-bottom: 16px;">
                                    <span>
                                        <span class="song-Line-label">LOSTs&nbsp;&nbsp;</span>
                                        <span class="song-Line-value"> {{ item.miss_count }}</span>
                                    </span>
                                    <span style="margin-left:  auto;margin-right:30%;">
                                        <span class="song-Line-label">RATING&nbsp;&nbsp;</span>
                                        <span class="song-Line-value">{{ item.rating.toFixed(2) }}</span>
                                    </span>
                                </div>
                                <div class="song-footer">
                                    <span class="song-score">{{ item.score }}</span>
                                    <img class="song-score-png"
                                        :class="{ 'song-score-png-ex': item.songLevel_bg.indexOf('ex+') === -1 && item.songLevel_bg.indexOf('ex') !== -1 }"
                                        :src="item.songLevel_bg" alt="" />
                                    <img class="song-png" :src="item.songGrade_bg" alt="" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="ScrollBox">

                    <ul class="songList">
                        <li class="song" :class="`song-${isColorDarkOrLight(item.theme_color)}`" v-for="item in B30"
                            :key="item.time_played">
                            <div class="songCard-BgBox">

                                <div class="songCard-bg-shadowBox"
                                    :style="item.theme_color ? `background:rgba(${item.theme_color.join(',')},0.54)` : ''">
                                </div>
                                <div class="songCard-bg-shadowBox-right"
                                    :style="item.theme_color ? `background:rgba(${item.theme_color.join(',')},0.54)` : ''">
                                    <img :src="`https://server.awbugl.top/botarcapi/assets/song?songid=${item.song_id}`"
                                        alt="图片加载失败" />
                                </div>

                            </div>
                            <div class="songCard">
                                <span class="songId">{{ item.song_id }}</span>
                                <div class="song-Line">
                                    <span>
                                        <span class="song-Line-label">PUREs&nbsp;&nbsp;</span>
                                        <span class="song-Line-value">
                                            {{ item.perfect_count }}
                                            ({{ item.shiny_perfect_count }})</span>
                                    </span>
                                    <span style="margin-left:  auto;margin-right: 30%;">
                                        <span class="song-Line-label">FARs&nbsp;&nbsp;</span>
                                        <span class="song-Line-value">{{ item.near_count }}</span>
                                    </span>
                                </div>
                                <div class="song-Line" style="margin-top:20px;margin-bottom: 16px;">
                                    <span>
                                        <span class="song-Line-label">LOSTs&nbsp;&nbsp;</span>
                                        <span class="song-Line-value"> {{ item.miss_count }}</span>
                                    </span>
                                    <span style="margin-left:  auto;margin-right: 30%;">
                                        <span class="song-Line-label">RATING&nbsp;&nbsp;</span>
                                        <span class="song-Line-value">{{ item.rating.toFixed(2) }}</span>
                                    </span>
                                </div>
                                <div class="song-footer">
                                    <span class="song-score">{{ item.score }}</span>
                                    <img class="song-score-png"
                                        :class="{ 'song-score-png-ex': item.songLevel_bg.indexOf('ex+') === -1 && item.songLevel_bg.indexOf('ex') !== -1 }"
                                        :src="item.songLevel_bg" alt="" />
                                    <img class="song-png" :src="item.songGrade_bg" alt="" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </main>
        <aside class="account-char" :style="{ backgroundImage: `url(${charBg})` }">
        </aside>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import search_Account, { RecentScoreType } from "~~/composables/search";
import { colorfulImg, isColorDarkOrLight } from "../utils/utils";
const route = useRoute();
const search = new search_Account(route.query.ArcId as string);
const currentswitch = ref<number>(0)
const charBg = ref<string>("https://server.awbugl.top/botarcapi/assets/char?partner=1");


await search.onCreated()
const B30 = await search.getUserB30();
const userDetali = search.getAccount_info()
const songList = search.getSongList();
await search.destroy();
async function getBgURL(sum: number, is_char_uncapped: boolean) {
    charBg.value = `https://server.awbugl.top/botarcapi/assets/char?partner=${sum}&awakened=${is_char_uncapped}`;
}
function insertStr(soure: string, start: number, newStr: string) {
    let newSoure = soure.split("").reverse().join("")
    return `${newSoure.slice(0, start)}${newStr}${newSoure.slice(start)}`.split("").reverse().join("")
}
function updateSwitch(e: number) {
    currentswitch.value = e
}

onMounted(() => {
    // const vConsole = new window.VConsole();
    // http://localhost:3000/api/assets?songid=worldender
    songList.forEach(e => colorfulImg(e.song_id, e))
    B30.forEach(e => colorfulImg(e.song_id, e))
})
getBgURL(userDetali.character, userDetali.is_char_uncapped)

</script>
<style lang="scss" scoped>
@import url("@/assets/css/song.scss");


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

.ScrollBox {
    flex: 1;
    overflow-y: auto;
    height: 60vh;
    padding: 0px 16px;

    &::-webkit-scrollbar {
        display: none;
    }
}

@media screen and (max-width: 501px) {
    .song {
        width: 100% !important;
        max-width: none !important;
    }

    .songList {
        grid-template-columns: 1fr !important;
    }
}

@media screen and (max-width: 830px) and (min-width: 501px) {

    .songList {
        grid-template-columns: 1fr 1fr !important;
    }
}

.songList {
    
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, min(350px, 32%));
    column-gap: 16px;

    .song {
        min-height: 30%;
        border-radius: 20px;

        margin-bottom: 12px;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        width: 100%;
        max-width: 350px;



        .songCard {

            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 2;
            padding: 16px 20px;
        }

        .songId {
            font-family: "Exo-Medium";
            font-size: 24px;
            margin-bottom: 12px;
            color: var(--Song-Main-Color)
        }

    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.userInfo {
    padding: 6vmin 10vmin 10vmin;
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
    position: relative;
    z-index: 10;
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
        width: min(120px, 15vmin);
        object-fit: cover;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -45%);
    }

}

.account-char {
    position: absolute;
    z-index: 3;
    background-size: cover;
    background-position: 0 20px;
    opacity: 0.4;
    width: 100%;
    height: 100%;
}

.song-carousel {
    display: flex;
    width: 200vw;
    transition: all 0.12s;
    transform: translateX(0%);
}

.SongList-B30Show {
    transform: translateX(-50%);
}

.song-footer {
    margin-top: auto;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.song-Line {
    display: flex;
    color: var(--Song-Main-Color);

    .song-Line-label {
        font-size: 12px;
        font-family: "Exo";
    }

    .song-Line-value {
        font-size: 16px;
        font-family: "Exo";
    }

}

.song-score {
    font-size: 30px;
    font-family: "Exo";
    margin-right: auto;
    color: var(--Song-Main-Color);
}

.song-png {
    object-fit: cover;
    width: 10%;
}

.song-score-png {
    object-fit: cover;
    width: 26%;
}

.song-score-png-ex {
    object-fit: cover;
    width: 18%;
}

.songCard-BgBox {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;

    .songCard-bg-shadowBox {
        flex: 1;
        background-color: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(3px);

    }




}

.songCard-bg-shadowBox-right {
    flex: 1;
    position: relative;
    background-color: rgba(255, 255, 255, 0.7);

    img {
        position: absolute;
        left: 0;
        top: 0;
        object-fit: cover;
        height: 100%;
        width: 100%;
        -webkit-mask-image: linear-gradient(to left, black, transparent);
        mask-image: linear-gradient(to left, black, transparent);
    }
}
</style>