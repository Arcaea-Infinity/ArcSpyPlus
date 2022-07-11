import type { RecentScoreType } from "~~/composables/search";

export async function colorfulImg(img: any | HTMLImageElement, item: RecentScoreType) {
    return new Promise((resolve, reject) => {
        if (!(img instanceof HTMLImageElement)) reject(false);
        const newImg = new Image();
        newImg.src = img.src; // 添加图片地址
        newImg.crossOrigin = "Anonymous"; // 跨域请求
        newImg.width = 1; // 压缩图片体积
        newImg.height = 1;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d"); // 构建canvas
        newImg.addEventListener("load", _ => {
            canvas.width = newImg.width;
            canvas.height = newImg.height; //canvas压缩大小到1px
            ctx.drawImage(newImg, 0, 0); // 图片绘制到canvas
            const data = ctx.getImageData(0, 0, 1, 1).data; // 获取原始canvas像素数据
            item.theme_color = `rgb(${data[0]},${data[1]},${data[2]})`; // 结束
            console.log(`${item.theme_color} ${item.song_id} is rgb: %c   `, `background:${item.theme_color}`)
            resolve({
                r: data[0],
                g: data[1],
                b: data[2]
            })
        })

    })

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