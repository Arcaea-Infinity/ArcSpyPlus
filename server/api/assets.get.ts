import { Blob } from "buffer";
import fs from "fs"
import image from "images"
export default defineEventHandler(async (event) => {
    const cookies = useCookies(event);
    const { songid, difficulty } = useQuery(event);

    if (songid && typeof songid === "string") {
        const path = process.cwd().replaceAll("/server", "/public").replaceAll(`\\ArcSpyPlus`, `\\ArcSpyPlus\\public`);
        let sign = path.indexOf("/") !== -1 ? "/" : "\\"
        try {
            const fileTry = [
                { path: `${path}${sign}${songid}_${difficulty}.png`, flag: fs.existsSync(`${path}${sign}${songid}_${difficulty}.png`) },
                { path: `${path}${sign}${songid}_${difficulty}.jpg`, flag: fs.existsSync(`${path}${sign}${songid}_${difficulty}.jpg`) }]
            if (fileTry[0].flag || fileTry[1].flag) {
                const buffer = fs.readFileSync(fileTry[0].flag ? fileTry[0].path : fileTry[1].path);
                return buffer
            } else {
                // console.log("文件不存在")
                const png: Blob = await $fetch(`https://server.awbugl.top/botarcapi/assets/song?songid=${songid}&difficulty=${difficulty}`);
                let type = png.type === "image/jpeg" ? "jpg" : "png"
                try {
                    const buffer = Buffer.from(await png.arrayBuffer())
                    image(buffer).save(`${path}${sign}${songid}_${difficulty}.${type}`, {
                        quality: 50
                    })
                    return buffer
                } catch (error) {
                    console.log("读取流的时候出错了")
                }
            }
        } catch (error) {
            console.log(error, '查询文件错误')
        }
    }

})