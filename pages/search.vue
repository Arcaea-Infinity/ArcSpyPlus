<template>
    <NuxtLayout name="page">
        <main class="searchMask column">
            <header class="between align-center userInfo" v-once>
                <div class="column">
                    <div class="userName">{{ userDetali?.name }}</div>
                    <div class="userId">{{ userDetali?.code.replace(/\s/g, "").replace(/(.{3})/g, "$1 ") }}</div>
                </div>
            </header>
            <SearchTab :userDetali="userDetali" :left="SongLeft" v-model:current="currentswitch" />
            <div class="song-carousel" ref="carouselBox" :class="{ 'SongList-B30Show': currentswitch == 1 }">
                <div class="ScrollBox">
                    <ul class="songList">
                        <SearchSongCardVue :loadTheme="loadThemeColor" first v-for="(item, index) in songList"
                            :index="index" :key="item.time_played" :item="item" :info="songInfo[index]">
                        </SearchSongCardVue>

                    </ul>
                </div>
                <div class="ScrollBox">
                    <ul class="songList">
                        <SearchSongCardVue :loadTheme="loadThemeColor" v-for="(item, index) in B30"
                            :key="item.time_played" :index="index" :item="item" :info="B30songInfo[index]">
                        </SearchSongCardVue>

                    </ul>
                </div>

            </div>
        </main>
        <aside class="account-char" :style="{ backgroundImage: `url(${charBg})`, backgroundPosition: charBgLocation }">
        </aside>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import search_Account from "@/composables/search";
import { colorfulImg, colorfulImg_two, getAccountFaceLocation } from "@/utils/utils";

import SearchSongCardVue from "../components/SearchSongCard.vue";
import { nextTick } from "vue"
const loadThemeColor = ref<boolean>(false)
const route = useRoute();
const search = new search_Account(route.query.ArcId as string);
const currentswitch = ref<number>(0)
const charBg = ref<string>("https://server.awbugl.top/botarcapi/assets/char?partner=1");
const charBgLocation = ref<string>("-73px -152px");
const SongListHeight = ref<string>("")
const SongLeft = ref<string>("");
const carouselBox = ref<HTMLDivElement>()
await search.onCreated()
const { B30, B30songInfo } = await search.getUserB30();
const userDetali = search.getAccount_info()
const songList = search.getSongList();
const songInfo = search.getSongInfo();
await search.destroy();

function getBoxHeight(e: HTMLDivElement) {
    if (e instanceof HTMLDivElement && SongListHeight.value.length <= 0) {
        nextTick(() => {
            SongListHeight.value = `${e.offsetHeight - 16}px`
        })
    }
}
async function getBgURL(sum: number, is_char_uncapped: boolean) {
    charBg.value = `https://server.awbugl.top/botarcapi/assets/char?partner=${sum}&awakened=${is_char_uncapped}`;
    charBgLocation.value = getAccountFaceLocation(`${sum}`, is_char_uncapped).join(" ")
}
let firstSongDom: HTMLLIElement | null = null
function preloadXY() {
    if (!firstSongDom) firstSongDom = document.querySelector<HTMLLIElement>("#firstSong");
    if (firstSongDom) {
        SongLeft.value = `${firstSongDom.offsetLeft}px`
    }
}
onMounted(async () => {
    if (carouselBox.value) {
        getBoxHeight(carouselBox.value)
    }
    if (window) {
        setTimeout(() => {
            preloadXY()
        })
        window.addEventListener("resize", preloadXY)
    }
    for (let i = 0; i < songList.length; i++) {
        const e = songList[i];
        await colorfulImg_two(e.song_id, e)
    }
    for (let i = 0; i < B30.length; i++) {
        const e = B30[i];
        await colorfulImg_two(e.song_id, e)
    }
    loadThemeColor.value = true
})
getBgURL(userDetali.character, userDetali.is_char_uncapped)

</script>
<style lang="scss" scoped>
.ScrollBox {
    flex: 1;
    overflow-y: auto;
    max-height: v-bind(SongListHeight);
    height: 55vh;
    min-height: v-bind(SongListHeight);
    padding: 0px 16px;

    &::-webkit-scrollbar {
        display: none;
    }
}

@media screen and (max-width: 500px) {
    .switchType {
        padding-left: 16px;
    }

    .ScrollBox {
        padding: 0;
    }

    .song {
        border-radius: 0px !important;
        width: 100% !important;
        max-width: none !important;

        * {
            user-select: none;
        }
    }

    .songList {
        row-gap: 0px !important;
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
    row-gap: 16px;


    .song {
        min-height: 30%;
        // border-radius: 20px;
        border-bottom: 1px solid #212121;
        // margin-bottom: 12px;
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
    color: #fff;
    font-weight: 500;

    .userName {
        font-weight: 600;
        font-size: min(55px, 8vmin);
    }

    .userId {
        font-family: "Exo";
    }
}

.searchMask {
    flex: 1;
    background-color: rgba(0, 0, 0, 0.21);
    position: relative;
    z-index: 10;
}

.account-char {
    position: absolute;
    z-index: 3;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-color: #2F2F39;
}

.song-carousel {
    flex: 1;
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