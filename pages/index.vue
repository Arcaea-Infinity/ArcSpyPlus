
<template>
    <NuxtLayout name="page">
        <MainPageLineBg></MainPageLineBg>
        <div class="mainPage-fullPage">
            <header class="mainPage-header">
                <h1 class="title">
                    arcSpy+
                    <img draggable="false" src="@/assets/img/title.svg" alt="title">
                </h1>
                <h2 class="description">The next generation score
                    profiler for Arcaea</h2>
            </header>
            <main class="mainPage-main">
                <form class="searchBox" :class="{ 'searchBoxError': showSearchError }" action="" @submit.prevent>
                    <img height="28" width="28" draggable="false" src="@/assets/img/qrCode.webp" class="qrCode"
                        alt="图片加载失败" />
                    <input type="search" v-model="search" id="search" placeholder="Search your ArcID"
                        @keyup.enter="SearchValue()">
                    <div style="height:100%" class="align-center" @click="SearchValue()">
                        <img width="21.59" height="21.59" draggable="false" src="@/assets/img/search_icon.webp"
                            class="searchIcon" alt="图片加载失败" />
                    </div>
                </form>
                <aside class="search-leaderBoard-box">
                    <ul class="search-leaderBoard">
                        <li class="search-leader" @click="SearchValue(item.text)" v-for="(item, index) in SearchCard"
                            :key="index">
                            {{ item.text }}
                        </li>
                    </ul>
                </aside>
            </main>
            <footer class="mainPage-footer">
                <span id="arcspy-version">
                    Build v0.1.041221
                </span>
                <a href="https://github.com/Arcaea-Infinity/ArcSpyPlus" class="githubLogo" target="_blank">
                    <span class="iconfont spy-github"></span>
                </a>
            </footer>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import nprogress from "nprogress"

import { UserHistory } from '~~/composables/search';
// import img from "../assets/img/mainPage_bg.png?raw"
// console.log(img)
const search = ref<string>("");
const showSearchError = ref<boolean>(false);
const SearchCard = ref<UserHistory[]>([])
onMounted(() => {
    if (window && window.localStorage) {
        nprogress.configure({ showSpinner: false });
        let userHistory: UserHistory[] | null | string = localStorage.getItem("searchHistory");
        SearchCard.value = userHistory ? JSON.parse(userHistory) as UserHistory[] : [];
    }
})
async function SearchValue(e?: string) {
    nprogress.start();
    const value = (e ?? search.value).replaceAll(" ", "")
    if (typeof value === "string" && value.length > 0) {
        try {
            let userHistory: UserHistory[] | null | string = localStorage.getItem("searchHistory");
            userHistory = userHistory ? JSON.parse(userHistory) as UserHistory[] : [];
            const SearchFind = userHistory.find(item => item.text === value);
            if (SearchFind) throw new Error("查询到相同的历史记录")
            if (userHistory.length >= 20) userHistory.shift()
            userHistory.push({
                text: value,
                time: Date.now()
            })
            localStorage.setItem("searchHistory", JSON.stringify(userHistory))
        } catch (error) {

        } finally {
            window.location.replace(`${window.location.origin}/search?ArcId=${e ?? search.value}`)
        }

    } else {
        showSearchError.value = true
        setTimeout(() => {
            showSearchError.value = false
        }, 200)
    }

}

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
    // link: [
    //     {
    //         href: "https://unpkg.com/nprogress@0.2.0/nprogress.css"
    //     }
    // ],
    // script: [{
    //     src: "https://unpkg.com/nprogress@0.2.0/nprogress.js",
    //     defer: "true",
    // }]
})
</script>
<style lang="scss" scoped>
.title {
    text-align: center;
    font-size: min(126px, 15vw);
    margin: 13vh auto 10vh;
    color: transparent;
    position: relative;
    user-select: none;

    img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
        width: 50vw;
        margin: 0 auto;
        user-select: none;
    }

    // background-image: url("@/assets/img/title.png");
    // background-repeat: no-repeat;
    // background-size: contain;
    // position: relative;
    // background-position: center;
}



.mainPage-fullPage {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.description {
    text-align: center;
    width: 60vw;
    font-size: 20px;
    line-height: 130%;
    color: #393856;
    font-family: "GeoSan";
    margin: 0 auto;
    user-select: none;
}

.search-leaderBoard-box {
    width: 100vw;
    overflow-y: auto;
    padding-left: 20vmin;

    &::-webkit-scrollbar {
        display: none;
    }
}

.search-leaderBoard {
    display: flex;
    flex-wrap: wrap;
    max-width: 150vmin;
    min-width: 30vmin;
    margin-top: 16px;

    .search-leader {
        border-radius: 40px;
        color: #817fa0;
        background-color: #F7F7FF;
        border: 1px solid rgba(78, 78, 83, 0.2);
        padding: 6px 17px;
        margin-right: 8px;
        font-size: 16px;
        font-family: "Exo";
        font-weight: bold;
        margin-bottom: 6px;
        user-select: none;
    }
}

.mainPage-main {
    margin: 10vh auto 0vh;

    .searchBoxError {
        background: red;
    }

    .searchBox {
        width: 72vw;
        max-width: 550px;
        border: 1px solid rgba(78, 78, 83, 0.2);
        height: 56px;
        border-radius: 40px;
        // box-shadow: 49px rgba(55, 53, 91, 0.2);
        background: linear-gradient(to right, #E1DFFF 10%, #EFEEFF);
        display: flex;
        align-items: center;
        box-shadow: 0px 0px 10px 0px rgba(55, 54, 91, 0.2);
        margin: 0 auto;
        transition: background-color 0.12s;

        .qrCode {
            object-fit: cover;
            margin-left: 20px;
            // height: 50%;
            user-select: none;
        }

        .searchIcon {
            object-fit: cover;
            margin-right: 20px;
            height: 40%;
            user-select: none;
        }

        #search {
            font-family: "Exo";
            height: 100%;
            outline: none;
            background-color: transparent !important;
            border: none;
            margin: 0 20px;
            font-size: 16px;
            font-weight: 500;
            flex: 1;
            width: 100%;
            user-select: none;


            &:-internal-autofill-selected {
                background-color: transparent !important;
            }

            &::placeholder {
                font-family: "Exo";
                font-size: 16px;
                // transform: translateX(5%);
                font-weight: bold;
            }
        }
    }
}

.mainPage-footer {
    margin-top: auto;
    width: 100%;
    position: relative;
    text-align: center;
    padding: min(50px, 10vw) 0;
    font-weight: 500;

    #arcspy-version {
        margin: 0 auto;
        font-family: "Exo";
        user-select: none;
    }

    .githubLogo {
        position: absolute;
        right: 6vmin;
        top: 50%;
        transform: translateY(-50%);
        user-select: none;

        .spy-github {
            opacity: 0.6;
            font-size: 40px;
        }
    }
}
</style>