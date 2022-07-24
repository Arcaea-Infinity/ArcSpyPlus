import type { RecentScoreType, RGB } from "~~/composables/search";
export async function colorfulImg(img: string | HTMLImageElement, item: RecentScoreType) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d"); // 构建canvas
        const newImg = new Image();
        newImg.crossOrigin = "Anonymous"; // 跨域请求校验
        newImg.width = 1; // 压缩图片大小到1 * 1
        newImg.height = 1;
        // console.log(ctx, canvas, newImg.complete, '构建成功');
        newImg.onerror = (e: Event) => {
            // console.log("加载错误失败");
            // console.log(e)
        }
        function load(_?: Event) {
            // console.log("进入load函数")
            canvas.width = newImg.width;
            canvas.height = newImg.height; //canvas压缩大小到1px
            ctx.drawImage(newImg, 0, 0); // 图片绘制到canvas
            const data = ctx.getImageData(0, 0, 1, 1).data; // 获取原始canvas像素数据
            item.theme_color = [data[0], data[1], data[2]] // 结束
            // console.log(`${item.theme_color} ${item.song_id} is rgb: %c   `, `background:rgb(${item.theme_color.join(",")})`)
            resolve({
                r: data[0],
                g: data[1],
                b: data[2]
            })
            newImg.removeEventListener("load", load)
        }
        newImg.addEventListener("load", load)
        newImg.src = typeof img === "string" ? img : img.src; // 添加图片地址
        // console.log(newImg.src, '图片路径')
        // const imgInterval = setInterval(() => {
        //     if (newImg.complete) {
        //         clearInterval(imgInterval);
        //         load()
        //     }
        // }, 1)
    })

}

/*
 * rgb value to hsl 色相(H)、饱和度(S)、明度(L)
 */
export function rgbToHsl(rgb: RGB = [255, 255, 255]) {
    // console.log(rgb, '我是rgb')

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

/*
 * 判断颜色属于深色还是浅色
 */
export function isColorDarkOrLight(rgbStr: RGB) {
    let [h, s, l] = rgbToHsl(rgbStr);
    return (l > 0.5) ? 'light' : 'dark';
}







const PPTborder = [
    (ppt: number) => (ppt < 300),
    (ppt: number) => (ppt < 300),
    (ppt: number) => (ppt < 700),
    (ppt: number) => (ppt > 700 && ppt < 1100),
    (ppt: number) => (ppt >= 1100 && ppt < 1200),
    (ppt: number) => (ppt >= 1100 && ppt < 1220),
    (ppt: number) => (ppt > 1220)]

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