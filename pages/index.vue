
<template>
    <div class="mainPage">

        <header class="mainPage-header">
            <h1 class="title">Arcspy+</h1>
            <h2 class="description">The next generation score
                profiler for Arcaea</h2>
        </header>
        <main class="mainPage-main">
            <div class="searchBox">
                <img src="@/assets/img/qrCode.png" class="qrCode" alt="图片加载失败" />
                <input type="text" id="search" placeholder="Search your ArcID">
                <img src="@/assets/img/search_icon.png" class="searchIcon" alt="图片加载失败" />
            </div>
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
// const { data: count } = await useFetch('/api/count')
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
    font-size: 15vw;
    margin: 13vh auto 10vh;
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

.mainPage-main {
    margin: 10vh auto 20vh;

    .searchBox {
        width: 70vw;
        height: 56px;
        border-radius: 40px;
        // box-shadow: 49px rgba(55, 53, 91, 0.2);
        background: linear-gradient(to right, #E1DFFF 10%, #EFEEFF);
        display: flex;
        align-items: center;

        .qrCode {
            object-fit: cover;
            padding-left: 20px;
            height: 50%;
        }

        .searchIcon {
            object-fit: cover;
            padding-right: 20px;
            height: 50%;
        }

        #search {
            height: 100%;
            outline: none;
            background-color: transparent;
            border: none;
            // padding: 0 20px;
            flex: 1;

            &::placeholder {
                font-family: "Exo";
                font-size: 18px;
                transform: translateX(5%);
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
    padding: 10vw 0;
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