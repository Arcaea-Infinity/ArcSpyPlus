
<template>
    <!-- <div class="mainPage"> -->
    <NuxtLayout name="page">
        <!-- <div> -->
            <MainPageLineBg></MainPageLineBg>
            <div class="mainPage-fullPage">
                <header class="mainPage-header">
                    <h1 class="title">
                        arcSpy+
                        <MainPageFontP></MainPageFontP>
                    </h1>
                    <h2 class="description">The next generation score
                        profiler for Arcaea</h2>
                </header>
                <main class="mainPage-main">
                    <form class="searchBox" :class="{ 'searchBoxError': showSearchError }" action="" @submit.prevent>
                        <img src="@/assets/img/qrCode.webp" class="qrCode" alt="图片加载失败" />
                        <input type="search" v-model="search" id="search" placeholder="Search your ArcID"
                            @keyup.enter="SearchValue">
                        <div style="height:100%" class="align-center" @click="SearchValue">
                            <img src="@/assets/img/search_icon.webp" class="searchIcon" alt="图片加载失败" />
                        </div>
                    </form>
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
        <!-- </div> -->
    </NuxtLayout>
    <!-- </div> -->
</template>

<script lang="ts" setup>
const search = ref<string>("");
const showSearchError = ref<boolean>(false)
async function SearchValue() {
    if (typeof search.value === "string" && search.value.length > 0) {
        const a = document.createElement("a")
        a.href = `${window.location.origin}/search?ArcId=${search.value}`
        a.click()
    } else {
        showSearchError.value = true
        setTimeout(() => {
            showSearchError.value = false
        }, 200)
    }

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
<style lang="scss" scoped>
.title {
    text-align: center;
    font-size: min(126px, 15vw);
    margin: 13vh auto 10vh;
    color: transparent;
    background-image: url("@/assets/img/title.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    background-position: center;
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