import fs from "fs"
function colorfulImg(img) {
    if (document) {
        // working

        // let canvas = document.createElement('canvas'),
        //     context = canvas.getContext && canvas.getContext('2d'),
        //     height, width, length, data,
        //     i = -4,
        //     blockSize = 5,
        //     count = 0,
        //     rgb = { r: 0, g: 0, b: 0 }

        // height = canvas.height = imgEl.height
        // width = canvas.width = imgEl.width
        // context.drawImage(imgEl, 0, 0);
        // data = context.getImageData(0, 0, width, height).data
        // length = data.length
        // while ((i += blockSize * 4) < length) {
        //     ++count;
        //     rgb.r += data[i];
        //     rgb.g += data[i + 1];
        //     rgb.b += data[i + 2];
        // }
        // rgb.r = ~~(rgb.r / count);
        // rgb.g = ~~(rgb.g / count);
        // rgb.b = ~~(rgb.b / count);
        // return rgb;
    }
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
    console.log(ppt, '我是用户ppt');
    const index = PPTborder.findIndex(e => e(ppt));
    const modules = import.meta.glob('../assets/img/account/rating/*.png');

    for (const path in modules) {
        if (path.indexOf(`${index}`) !== -1) {
            console.log("匹配到用户头像了")
            const mod = await modules[path]();
            return Promise.resolve(mod.default as string)
        }
    }
    console.log("没匹配到")
}