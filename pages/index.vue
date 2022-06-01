
<template>
    <div class="mainPage">

        <header class="mainPage-header">
            <h1 class="title">
                arcSpy+
                <MainPageFontP></MainPageFontP>
            </h1>
            <h2 class="description">The next generation score
                profiler for Arcaea</h2>
        </header>
        <main class="mainPage-main">
            <div class="searchBox">
                <img src="@/assets/img/qrCode.webp" class="qrCode" alt="图片加载失败" />
                <input type="text" v-model="search" id="search" placeholder="Search your ArcID" @change="SearchValue">
                <img src="@/assets/img/search_icon.webp" class="searchIcon" @click="SearchValue" alt="图片加载失败" />
            </div>
            <aside class="search-leaderBoard-box">
                <ul class="search-leaderBoard">
                    <li class="search-leader" v-for="item in 19">
                        616SB
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
</template>

<script lang="ts" setup>
const search = useSearch();
// refresh();
// const search = () => useState('')

// const router = useRouter()
async function SearchValue() {
    // console.log(search)
    const a = document.createElement("a")
    a.href = `${window.location.origin}/search?ArcId=${search.value}`
    a.click()
    // navigateTo({
    //     path: "/search",
    //     name: "search"
    // })
    // router.push({
    //     path: "/search",
    //     name: "search",
    //     params: {
    //         ArcId: search.value
    //     }
    // })
}

useHead({
    titleTemplate: 'My App - %s',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        { name: 'description', content: 'My amazing site.' }
    ],
    bodyAttrs: {
        class: 'test'
    }
})
</script>
<style lang="less" scoped>
.title {
    text-align: center;
    font-size: min(126px, 15vw);
    margin: 13vh auto 10vh;
    color: transparent;
    background-image: url("@/assets/img/title.png");
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
}

.mainPage {
    background: url(/_nuxt/assets/img/mainPage_bg.png);
    background-position: bottom 91% right 56%;
    background-repeat: no-repeat;
    background-size: 190%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.description {
    text-align: center;
    width: 60vw;
    font-size: 20px;
    line-height: 130%;
    color: #393856;
    font-family: "GeoSan";
}

.search-leaderBoard-box {
    width: 100vw;
    overflow-y: auto;
    padding-left: 50vw;

    &::-webkit-scrollbar {
        display: none;
    }
}

.search-leaderBoard {
    display: flex;
    flex-wrap: wrap;
    width: 200vw;
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
    }
}

.mainPage-main {
    margin: 10vh auto 0vh;

    .searchBox {
        width: 70vw;
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

        .qrCode {
            object-fit: cover;
            padding-left: 20px;
            height: 50%;
        }

        .searchIcon {
            object-fit: cover;
            padding-right: 20px;
            height: 40%;
        }

        #search {
            font-family: "Exo";
            height: 100%;
            outline: none;
            background-color: transparent;
            border: none;
            margin: 0 20px;
            font-size: 16px;
            font-weight: 500;
            flex: 1;
            width: 100%;

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
    }

    .githubLogo {
        position: absolute;
        right: 6vmin;
        top: 50%;
        transform: translateY(-50%);

        .spy-github {
            opacity: 0.6;
            font-size: 40px;
        }
    }
}
</style>