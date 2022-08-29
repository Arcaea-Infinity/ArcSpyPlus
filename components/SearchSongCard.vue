<template>
    <li class="song-Box" :id="first && index === 0 ? 'firstSong' : ''">
        <div class="song_diff  " :class="cssColor" :style="{ background: `hsl(${diffColor})` }">
            <p class="center">
                {{ pointRating(`${info.rating}`) }}
                {{ Backdiff(item.difficulty) }}
            </p>
        </div>
        <div class="song" :class="cssColor" @click="StartClick" @touchstart="StartTouch" @touchmove="moveTouch"
            @touchend="endTouch" @touchcancel="endTouch">
            <div class="songCard-BgBox">

                <div class="songCard-bg-shadowBox"
                    :style="item.theme_color ? `background:rgba(${item.theme_color.join(',')},0.98)` : ''">
                </div>
                <div class="songCard-bg-shadowBox-right"
                    :style="item.theme_color ? `background:rgba(${item.theme_color.join(',')},0.98)` : ''">
                    <img :src="`https://server.awbugl.top/botarcapi/assets/song?songid=${item.song_id}`" alt="图片加载失败" />
                </div>
            </div>
            <div class="songCard">
                <span class="songId">
                    <span style="margin-right: 6px;">
                        {{ index + 1 }}#
                    </span>
                    {{ info.name_en }}</span>
                <div class="song-Line">
                    <span style="min-width:150px">
                        <span class="song-Line-label">PUREs&nbsp;&nbsp;</span>
                        <span class="song-Line-value">
                            {{ item.perfect_count }}
                            ({{ item.shiny_perfect_count }})</span>
                    </span>
                    <span style="margin-left:5%;margin-right: 30%;">
                        <span class="song-Line-label">FARs&nbsp;&nbsp;</span>
                        <span class="song-Line-value">{{ item.near_count }}</span>
                    </span>
                </div>
                <div class="song-Line" style="margin-top:20px;margin-bottom: 16px;">
                    <span style="min-width:150px">
                        <span class="song-Line-label">LOSTs&nbsp;&nbsp;</span>
                        <span class="song-Line-value"> {{ item.miss_count }}</span>
                    </span>
                    <span style="margin-left:5%;margin-right: 30%;">
                        <span class="song-Line-label">RATING&nbsp;&nbsp;</span>
                        <span class="song-Line-value">{{ item.rating.toFixed(2) }}</span>
                    </span>
                </div>
                <div class="song-footer">
                    <span class="song-score">{{ reverseStr(`${item.score}`) }}</span>
                    <img class="song-score-png"
                        :class="{ 'song-score-png-ex': item.songLevel_bg.indexOf('ex+') === -1 && item.songLevel_bg.indexOf('ex') !== -1 }"
                        :src="item.songLevel_bg" alt="" />
                    <img class="song-png" :src="item.songGrade_bg" alt="" />
                </div>
            </div>
        </div>
    </li>
</template>

<script lang="ts" setup>
import { isColorDarkOrLight, darkenColor } from "@/utils/utils";
import type { RecentScoreType, SongInfo } from '@/composables/search';
import { nextTick, watch } from "vue"
interface Prop {
    item: RecentScoreType;
    info: SongInfo;
    index?: number;
    first?: boolean;
    loadTheme: boolean;
}
// const
const cssColor = ref<string>("song-light");
const diffColor = ref<string>("")
const prop = defineProps<Prop>();
const stop = watch(() => prop.loadTheme, () => {
    cssColor.value = 'song-' + isColorDarkOrLight(prop.item.theme_color);
    diffColor.value = darkenColor(prop.item.theme_color);
    stop()
})
function Backdiff(diff: string | number) {
    return ["PST", "PRS", "FTR", "BYD"][diff]
}
type OffSetType = `${number}px`;
let touchFlag = false;
let offsetStart = 0;
const offSet = ref<OffSetType>("0px")
function StartTouch(e: TouchEvent) {
    offsetStart = e.targetTouches[0].clientX;
    touchFlag = true;
}
function pointRating(rating: string) {
    const arr = rating.split("").reverse();
    arr[0] = "." + arr[0]
    return arr.reverse().join("")
}
function StartClick() {
    if (window.ontouchstart) {
        touchFlag = false;
        offsetStart = 0;
        offSet.value = "0px";
    } else {
        if (touchFlag) {
            offSet.value = `0px`;
        } else {
            offSet.value = `80px`;
        }
        touchFlag = !touchFlag;
    }
}
function moveTouch(e: TouchEvent) {
    if (touchFlag) {
        const X = offsetStart - e.targetTouches[0].clientX;
        if (X > -80 && X < 0) {
            offSet.value = `${X * -1}px`;
        }
    }
}
function endTouch(e: TouchEvent) {
    // touchFlag = false;
    // offsetStart = 0;
    // offSet.value = "0px";
}
function reverseStr(str: string): string {
    let newstr: string = str.split("").reverse().join("");
    const arr = new Array(8).fill("0", 0, 8 - newstr.length)
    newstr += arr.join("");
    newstr = newstr.replace(/\s/g, "").replace(/(.{3})/g, "$1'")
    return newstr.split("").reverse().join("");
}


</script>
<style lang="scss" scoped>
.song {
    min-height: 30%;
    height: 100%;
    border-bottom: 1px solid #212121;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 350px;
    transition: all 0.2s;
    transform: translateX(v-bind(offSet));
    z-index: 2;

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
        color: var(--Song-Main-Color);
        white-space: nowrap;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
    }

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

.song-footer {
    margin-top: auto;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

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


@media screen and (max-width: 500px) {

    .song {
        border-radius: 0px !important;
        width: 100% !important;
        max-width: none !important;

        * {
            user-select: none;
        }
    }
}

.song-Box {
    position: relative;
    overflow: hidden;

    .song_diff {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;

        p {
            width: 14%;
            height: 100%;
            word-wrap: break-word;
            word-break: break-all;
            z-index: 1;
            font-size: 24px;
            color: var(--Song-Main-Color);
            font-family: "Exo";
            writing-mode: vertical-lr;
        }
    }
}
</style>