import type { RecentScoreType, RGB } from "~~/composables/search";
export async function colorfulImg(img: string | HTMLImageElement, item: RecentScoreType) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d"); // 构建canvas
        const newImg = new Image();
        newImg.crossOrigin = "Anonymous"; // 跨域请求校验
        newImg.width = 1; // 压缩图片大小到1 * 1
        newImg.height = 1;
        function load(_?: Event) {
            canvas.width = newImg.width;
            canvas.height = newImg.height; //canvas压缩大小到1px
            ctx.drawImage(newImg, 0, 0); // 图片绘制到canvas
            const data = ctx.getImageData(0, 0, 1, 1).data; // 获取原始canvas像素数据


            item.theme_color = [data[0], data[1], data[2]] // 结束
            resolve({
                r: data[0],
                g: data[1],
                b: data[2]
            })
            newImg.removeEventListener("load", load)
        }
        function error(_?: Event) {
            if (newImg.src.indexOf(".jpg") !== -1) {
                newImg.src = `${window.origin}/api/assets?songid=${img}&difficulty=${item.difficulty}`
            }
        }
        newImg.addEventListener("load", load);
        newImg.addEventListener("error", error);
        if (typeof img === "string") {
            newImg.src = `${window.origin}/${img}_${item.difficulty}.jpg`
        }
    })
}

export function colorfulImg_two(img: string, item: RecentScoreType) {
    return new Promise((resolve, reject) => {
        const newImg = new Image();
        let canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            height: number, width: number, length: number, data: Uint8ClampedArray,
            i = -4,
            blockSize = 5,
            count = 0,
            rgb = { r: 0, g: 0, b: 0 }


        function load(_?: Event) {
            canvas.width = newImg.width;
            canvas.height = newImg.height; //canvas压缩大小到1px
            context.drawImage(newImg, 0, 0); // 图片绘制到canvas

            data = context.getImageData(0, 0, newImg.width, newImg.height).data
            length = data.length
            while ((i += blockSize * 4) < length) {
                ++count;
                rgb.r += data[i];
                rgb.g += data[i + 1];
                rgb.b += data[i + 2];
            }
            rgb.r = ~~(rgb.r / count);
            rgb.g = ~~(rgb.g / count);
            rgb.b = ~~(rgb.b / count);
            item.theme_color = [rgb.r, rgb.g, rgb.b] // 结束
            resolve(rgb)
            newImg.removeEventListener("load", load)
        }
        function error(_?: Event) {
            if (newImg.src.indexOf(".jpg") !== -1) {
                newImg.src = `${window.origin}/api/assets?songid=${img}&difficulty=${item.difficulty}`
            }
        }
        newImg.addEventListener("load", load);
        newImg.addEventListener("error", error);
        if (typeof img === "string") {
            newImg.src = `${window.origin}/${img}_${item.difficulty}.jpg`
        }

    })
}




/*
 * rgb value to hsl 色相(H)、饱和度(S)、明度(L)
 */
export function rgbToHsl(rgb: RGB = [255, 255, 255]) {

    let [r, g, b] = rgb;
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}
export function darkenColor(rgb: RGB = [255, 255, 255]) {
    const hsl = rgbToHsl(rgb);
    hsl[0] = `${(hsl[0] * 360).toFixed(2)}deg`;
    hsl[1] = `${(hsl[1] * 100).toFixed(2)}%`;
    hsl[2] = `${((hsl[2] * 100) + 8).toFixed(2)}%`;
    return hsl.join(" ")
}


/*
 * 判断颜色属于深色还是浅色
 */


/*
 * 判断颜色属于深色还是浅色
 */
export function isColorDarkOrLight(rgbStr: RGB) {
    if (!rgbStr) return;
    let [h, s, l] = rgbToHsl(rgbStr);
    return (l > 0.5) ? 'light' : 'dark';
}








const PPTborder = [
    (ppt: number) => (ppt < 300),
    (ppt: number) => (ppt < 300),
    (ppt: number) => (ppt < 700),
    (ppt: number) => (ppt > 700 && ppt < 1100),
    (ppt: number) => (ppt >= 1100 && ppt < 1200),
    (ppt: number) => (ppt >= 1100 && ppt < 1250),
    (ppt: number) => (ppt > 1250)]

export async function getAccountPPTBorder(ppt: number): Promise<string> {
    const index = PPTborder.findIndex(e => e(ppt));
    const modules = import.meta.glob('../assets/img/account/rating/*.png');

    for (const path in modules) {
        if (path.indexOf(`${index}.png`) !== -1) {
            const mod = await modules[path]();
            return Promise.resolve(mod.default as string)
        }
    }
}
const fraction = [
    (score: number) => !(score < 8600000) || "d",
    (score: number) => !(score > 8600000 && score < 8900000) || "c",
    (score: number) => !(score > 8900000 && score < 9200000) || "b",
    (score: number) => !(score > 9200000 && score < 9500000) || "a",
    (score: number) => !(score >= 9500000 && score < 9800000) || "aa",
    (score: number) => !(score >= 9800000 && score < 9900000) || "ex",
    (score: number) => !(score > 9900000) || "ex+"]
export async function getAccountSongLevel(num: number): Promise<string> {
    const name = fraction.find(e => typeof e(num) === "string")(num);
    const modules = import.meta.glob('../assets/img/account/grade/*.png');
    for (const path in modules) {
        if (path.indexOf(`${name}.png`) !== -1) {
            const mod = await modules[path]();
            return Promise.resolve(mod.default as string)
        }
    }
}

const grade = [
    (gradeSum: number) => !(gradeSum === 0) || "mini_fail",
    (gradeSum: number) => !(gradeSum === 1) || "mini_normal",
    (gradeSum: number) => !(gradeSum === 2) || "mini_full",
    (gradeSum: number) => !(gradeSum === 3) || "mini_pure",
    (gradeSum: number) => !(gradeSum === 4) || "mini_easy",
    (gradeSum: number) => !(gradeSum === 5) || "mini_hard"]
export async function getAccountSongGrade(num: number): Promise<string> {
    const name = grade.find(e => typeof e(num) === "string")(num);
    const modules = import.meta.glob('../assets/img/account/clear_badge/*.png');
    for (const path in modules) {
        if (path.indexOf(`${name}.png`) !== -1) {
            const mod = await modules[path]();
            return Promise.resolve(mod.default as string)
        }
    }
}
const charLocation = new Map<string, [string, string]>()
charLocation.set("1", ["-73px", "-11px"]); // 对立
charLocation.set("1u", ["-73px", "-9px"]);
charLocation.set("2", ["-73px", "-62px"]); // 红
charLocation.set("2u", ["-73px", "-90px"]);
charLocation.set("3", ["-20px", "-86px"]); // dy联动角色
charLocation.set("4", ["-47px", " -37px"]); // 忘却
charLocation.set("4u", ["-152px", "-111px"]);
charLocation.set("5", ["-12px", "-180px"]); // 光 & 对立
charLocation.set("5u", ["-12px", "-180px"]); // 觉醒  光 & 对立 无变化
charLocation.set("6", ["-50px", "-46px"]); // 花对立
charLocation.set("7", ["-75px", "-126px"]); // 伞对立 无觉醒
charLocation.set("8", ["-76px", "-43px"]); // 夜莺吹雪联动角色 无觉醒
charLocation.set("9", ["-58px", "-97px"]); // lanota 联动角色 无觉醒
charLocation.set("10", ["-18px", "-50px"]); // 伊莉丝 无觉醒 
charLocation.set("11", ["-38px", "-90px"]); // 双子爱托 白 
charLocation.set("11u", ["-48px", "-185px"]);
charLocation.set("12", ["-81px", "-98px"]); // 双子 露娜 紫
charLocation.set("12u", ["-72px", "-166px"]);
charLocation.set("13", ["-24px", "-55px"]); // 调 红色吉他
charLocation.set("13u", ["-102px", "-45px"]);
charLocation.set("14", ["-25px", "-122px"]); // 零光 无觉醒
charLocation.set("15", ["-68px", "-37px"]); // 骨折光 无觉醒
charLocation.set("16", ["18px", "-112px"]); // 夏日限定光 无觉醒
charLocation.set("17", ["-35px", "-84px"]); // 夏日限定对立 无觉醒
charLocation.set("18", ["-98px", "-122px"]); //  联动手冲对立 无觉醒
charLocation.set("19", ["-16px", "-93px"]); // 彩梦
charLocation.set("19u", ["-60px", "-120px"]);
charLocation.set("20", ["-36px ", "-86px"]); // 冬日限定 爱托 & 露娜
charLocation.set("21", ["-29px", "-66px"]); // 语音角色柚梅
charLocation.set("21u", ["-33px", "-67px"]);
charLocation.set("22", ["-69px ", "-49px"]); // 光 & 赛依娜 联动（衔尾蛇） 无觉醒
charLocation.set("23", ["0px", "-70px"]); // 咲弥 无觉醒
charLocation.set("24", ["-211px", "-144px"]); // 对立 & 中二企鹅 无觉醒
charLocation.set("25", ["-70px ", "-133px"]); // 中二企鹅 无觉醒
charLocation.set("26", ["-39px", "-78px"]);  // 中二  秦名
charLocation.set("26u", ["-86px", "-102px"]);
charLocation.set("27", ["-34px", "-119px"]); // 中二 诺诺
charLocation.set("27u", ["-44px", "-119px"]);
charLocation.set("28", ["40%", "-157px"]); // 中二 潘多拉涅墨西斯
charLocation.set("28u", ["-179px", "-147px"]);
charLocation.set("29", ["-67px", "-97px"]);  // 中二 轩辕十四
charLocation.set("29u", ["-69px ", "-93px"]);
charLocation.set("30", ["40px", "-139px"]); // 群愿 无觉醒
charLocation.set("31", ["12px ", "-75px"]); // 专辑 光 无觉醒
charLocation.set("32", ["-42px", "-69px"]); // 专辑 对立 无觉醒
charLocation.set("33", ["-48px", "-125px"]);  // 兮娅 无觉醒
charLocation.set("34", ["-43px", "-85px"]);  // DORO*C 血魔王 无觉醒
charLocation.set("35", ["-111px", "-163px"]); // 风暴对立 无觉醒
charLocation.set("36", ["-97px", "-160px"]);  // 布利兰特
charLocation.set("36u", ["-104px ", "-155px"]);
charLocation.set("37", ["-100px", "-49px"]);  // 夏日限定 伊莉丝
charLocation.set("38", ["-131px", "-47px"]);  // 专辑 咲弥
charLocation.set("39", ["-136px", "-158px"]);   // 爱丽丝 & 丹尼尔
charLocation.set("40", ["-97px", "-160px"]); // 露娜 & 音击 联动角色
charLocation.set("41", ["-97px", "-160px"]); // 联动 climax 阿莱乌斯 角色
charLocation.set("42", ["-100px ", "-60px"]);  // 希尔
charLocation.set("42u", ["-128px ", "-154px"]);
charLocation.set("43", ["-85px ", "-50px"]);  // 伊莎贝尔
charLocation.set("43u", ["-92px  ", "-95px"]);
charLocation.set("44", ["-12px  ", "-51px"]); //  迷尔
charLocation.set("45", ["-189px", "-73px"]);  // 拉格兰
charLocation.set("46", ["-79px ", "-71px"]);  // 凛可 语音角色
charLocation.set("47", ["-23px  ", "-99px"]); // 奈美
charLocation.set("48", ["-61px ", "-72px "]);  // 咲弥 & 伊丽莎白 联动
charLocation.set("49", ["-47px  ", "-88px"]);  //  莉莉
charLocation.set("50", ["-137px", "-60px"]);  // 夏日限定 群愿
charLocation.set("51", ["-94px", "-62px"]);   // 爱丽丝 & 坦尼尔
charLocation.set("52", ["-60px ", "-88px"]);  // 对立（Elegy）
charLocation.set("53", ["-12px ", "-57px"]);  // 玛莉嘉
charLocation.set("54", ["-50px", " -117px"]); // 维塔
charLocation.set("55", ["-111px", "-179px"]); // 杀对立的光光
export function getAccountFaceLocation(account: string, u: boolean) {
    const key = `${account}${u ? "u" : ""}`
    if (charLocation.has(key)) {
        return charLocation.get(key)
    }
}