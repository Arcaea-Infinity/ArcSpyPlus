import { QueryValue } from "ufo";

export const BaseURL = "你的服务地址";
export const Authorization = "Auth校验头,你不需要可以删除"
/**
 * @description 静态资源获取接口 图片资源缓存用
 * @param difficulty 难度
 * @param songid 歌曲id
 * */
export function getAssets(songid: string, difficulty: string | QueryValue) {
    return `${BaseURL}/assets/song?songid=${songid}&difficulty=${difficulty}`
}