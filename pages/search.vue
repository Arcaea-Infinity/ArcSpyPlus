<template>
    <NuxtLayout name="page">
        <main class="searchMask column">
            <header class="between align-center userInfo" v-memo>
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
            <div class="song-carousel" :class="{ 'SongList-B30Show': currentswitch === 1 }" v-memo>
                <ul class="songList">
                    <li class="song" v-for="item in songList" :key="item.time_played">
                        <div class="songCard-BgBox">
                            <div class="songCard-bg-shadowBox"></div>
                            <div class="songCard-bg-shadowBox-right"></div>
                            <img class="songCard-Bg" :ref="(e) => colorfulImg(e, item)"
                                :src="`https://server.awbugl.top/botarcapi/assets/song?songid=${item.song_id}`" alt="">
                        </div>
                        <div class="songCard">
                            <span class="songId">{{ item.song_id }}</span>
                            <div class="song-Line">
                                <span>
                                    <span class="song-Line-label">PUREs&nbsp;&nbsp;</span>
                                    <span class="song-Line-value">{{ item.perfect_count }}({{ item.shiny_perfect_count
                                    }})</span>
                                </span>
                                <span style="margin-left:  auto;margin-right: 10%;">
                                    <span class="song-Line-label">FARs&nbsp;&nbsp;</span>
                                    <span class="song-Line-value">{{ item.near_count }}</span>
                                </span>
                            </div>
                            <div class="song-Line" style="margin-top:20px;margin-bottom: 16px;">
                                <span>
                                    <span class="song-Line-label">LOSTs&nbsp;&nbsp;</span>
                                    <span class="song-Line-value"> {{ item.miss_count }}</span>
                                </span>
                                <span style="margin-left:  auto;margin-right: 10%;">
                                    <span class="song-Line-label">RATING&nbsp;&nbsp;</span>
                                    <span class="song-Line-value">{{ item.rating.toFixed(2) }}</span>
                                </span>
                            </div>
                            <div class="song-footer">
                                <span class="song-score">{{ item.score }}</span>
                                <img class="song-png" :src="item.songGrade_bg" alt="" />
                                <img class="song-score-png" :src="item.songLevel_bg" alt="" />
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="songList">
                    <li class="song" v-for="item in B30" :key="item.time_played">
                        <div class="songCard-BgBox">
                            <img class="songCard-Bg"
                                :src="`https://server.awbugl.top/botarcapi/assets/song?songid=${item.song_id}`" alt="">
                        </div>
                        <div class="songCard">
                            <span class="songId">{{ item.song_id }}</span>
                            <div class="song-Line">
                                <span>
                                    <span class="song-Line-label">PUREs&nbsp;&nbsp;</span>
                                    <span class="song-Line-value">{{ item.perfect_count }}({{ item.shiny_perfect_count
                                    }})</span>
                                </span>
                                <span style="margin-left:  auto;margin-right: 10%;">
                                    <span class="song-Line-label">FARs&nbsp;&nbsp;</span>
                                    <span class="song-Line-value">{{ item.near_count }}</span>
                                </span>
                            </div>
                            <div class="song-Line" style="margin-top:20px;margin-bottom: 16px;">
                                <span>                                                                          32222222222222222222223222222222212
                                    <span class="song-Line-label">LOSTs&nbsp;&nbsp;</span>
                                    <span class="song-Line-value"> {{ item.miss_count }}</span>
                                </span>
                                <span style="margin-left:  auto;margin-right: 10%;">
                                    <span class="song-Line-label">RATING&nbsp;&nbsp;</span>
                                    <span class="song-Line-value">{{ item.rating.toFixed(2) }}</span>
                                </span>
                            </div>
                            <div class="song-footer">
                                <span class="song-score">{{ item.score }}</span>
                                <img class="song-png" :src="item.songGrade_bg" alt="" />
                                <img class="song-score-png" :src="item.songLevel_bg" alt="" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
        <aside class="account-char" :style="{ backgroundImage: `url(${charBg})` }">
        </aside>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import search_Account from "~~/composables/search";
import { colorfulImg } from "../utils/utils"
const route = useRoute();
const search = new search_Account(route.query.ArcId as string);
const currentswitch = ref<number>(0)
const charBg = ref<string>("");
async function getBgURL(sum: number, is_char_uncapped: boolean) {
    const modules = import.meta.glob("../assets/img/account/char/*.png");
    const data = Object.keys(modules).find(e => e.indexOf(`${sum}${is_char_uncapped ? "u" : ""}`) !== -1);
    charBg.value = (await modules[data]()).default
}
function insertStr(soure: string, start: number, newStr: string) {
    let newSoure = soure.split("").reverse().join("")
    return `${newSoure.slice(0, start)}${newStr}${newSoure.slice(start)}`.split("").reverse().join("")
}
function updateSwitch(e: number) {
    currentswitch.value = e
}

await search.onCreated()
const B30 = await search.getUserB30();
const userDetali = search.getAccount_info()
const songList = search.getSongList();
console.log("查分完毕")
await search.destroy();
getBgURL(userDetali.character, userDetali.is_char_uncapped)
useHead({
    titleTemplate: 'ArcSpy+',
    viewport: 'width=device-width,user-scalable=no, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'description', content: '一个简单的arc查分网站' }
    ],
    htmlAttrs: {
        lang: "zh-cn"
    },
    link: [
        {
            href: "https://unpkg.com/nprogress@0.2.0/nprogress.css"
        }
    ],
    script: [{
        src: "https://unpkg.com/nprogress@0.2.0/nprogress.js",
        defer: "true",
    }]
})
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
        min-height: 30%;
        border-radius: 20px;
        // background-color: #FFFFFF;
        margin-bottom: 12px;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;





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
        }

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
        width: 20vmin;
        object-fit: cover;
        transform: translateY(-23%) translate(-15%);
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
}

.song-png {
    object-fit: cover;
    width: 10%;
}

.song-score-png {
    object-fit: cover;
    width: 26%;
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
        position: absolute;
        width: 50%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 3;
        background-color: rgba(255, 255, 255, 0.43);
        // box-shadow: 0px 10px 0px 0px rgba(255, 255, 255, 1);
        backdrop-filter: blur(3px);
    }

    .songCard-bg-shadowBox-right {
        position: absolute;
        width: 50%;
        height: 100%;
        right: 0;
        top: 0;
        z-index: 3;
        background-color: rgba(255, 255, 255, 0.43);
        box-shadow: 10px 0px 0px 0px rgba(255, 255, 255, 1) inset;
    }

    .songCard-Bg {
        position: absolute;
        object-fit: cover;
        top: 50%;
        height: 100%;
        transform: translateY(-50%);
        right: 0px;
        width: 50%;
        opacity: 0.42;
        z-index: 2;

        &::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 50%;
            box-shadow: 0 0 30px 10px rgba(255, 255, 255, .7) inset;
        }
    }
}
</style>