import { BaseURL, Authorization } from "~~/env.local";
import { getAccountPPTBorder, getAccountSongLevel, getAccountSongGrade } from "~~/utils/utils";

export type ResultCallBack = (result: SearchValue) => void;
export type RGB = [number, number, number]


export interface UserHistory {
    text: string;
    time: number;
}

export interface RecentScoreType {
    score: number;
    health: number;
    rating: number;
    song_id: string;
    modifier: number;
    difficulty: number;
    clear_type: number;
    best_clear_type: number;
    songLevel_bg?: string; // 用户游玩得分标准
    songGrade_bg?: string; // 用户游玩歌曲评级
    theme_color: RGB; // 主题色
    time_played: number;
    near_count: number;
    miss_count: number;
    perfect_count: number;
    shiny_perfect_count: number;
}

export interface RequestBox<T = null> {
    status: 0 | -3;
    message?: string;
    content?: T
}
export interface account_info {
    code: string;
    name: string;
    user_id: number;
    is_mutual: boolean;
    is_char_uncapped_override: boolean;
    is_char_uncapped: boolean;
    is_skill_sealed: boolean;
    rating: number;
    rating_bg?: string; // 用户header背景图
    join_date: number | string;
    character: number;
}
export interface SongInfo {
    name_en: string,
    name_jp: string,
    artist: string,
    bpm: string,
    bpm_base: number,
    set: string,
    set_friendly: string,
    time: number,
    side: number,
    world_unlock: boolean,
    remote_download: boolean,
    bg: string,
    date: number,
    version: string,
    difficulty: number,
    rating: number,
    note: number,
    chart_designer: string,
    jacket_designer: string,
    jacket_override: boolean,
    audio_override: boolean
}
export interface SearchValue {
    account_info: account_info;
    recent_score: RecentScoreType[];
    songinfo: SongInfo[]
}
export interface Bast30 {
    best30_avg: number,
    recent10_avg: number,
    account_info: account_info;
    best30_list: RecentScoreType[];
    best30_songinfo: SongInfo[];
    best30_overflow: RecentScoreType[];
    best30_overflow_songinfo: SongInfo[];
}

export default class search_Account {
    private account_Info: SearchValue;
    private searchResultBack = new Map<RequestBox["status"], ResultCallBack>();
    private ArcId: string = "";
    private Status: "success" | "failed" | "padding" = "padding"
    constructor(ArcId: string) {
        this.searchResultBack.set(-3, this.AccountStatus_notFound);
        this.searchResultBack.set(0, this.AccountStatus_success);
        this.ArcId = ArcId
    }

    public async onCreated(): Promise<void> {
        try {
            const { data: result } = await useAsyncData<RequestBox<SearchValue>>(
                "account_info",
                () => $fetch(`botarcapi/user/info`,
                    {
                        params: {
                            user: this.ArcId.replaceAll(" ", ""),
                            recent: 7,
                            withsonginfo: true
                        },
                        baseURL: BaseURL,
                        headers: {
                            Authorization
                        }
                    }),
                {
                    lazy: false,
                    server: true,
                    default: () => {
                        return {
                            status: -3,
                            message: "我是默认返回",
                            content: {
                                account_info: {
                                    code: "1919",
                                    name: "查询失败",
                                    user_id: 114514,
                                    is_mutual: false,
                                    is_char_uncapped_override: false,
                                    is_char_uncapped: false,
                                    is_skill_sealed: false,
                                    rating: 616,
                                    join_date: new Date().toLocaleString().replaceAll("/", "-"),
                                    character: 0,
                                },
                                recent_score: [],
                                songinfo: []
                            },
                        }
                    }
                }
            );
            if (result.value) {
                try {
                    if (result.value.status === 0) {
                        result.value.content.account_info.rating_bg = await getAccountPPTBorder(result.value.content.account_info.rating);
                        for (let i = 0; i < result.value.content.recent_score.length; i++) {
                            const e = result.value.content.recent_score[i]
                            e.songLevel_bg = await getAccountSongLevel(e.score);
                            e.songGrade_bg = await getAccountSongGrade(e.clear_type);
                        }
                    }
                } catch (error) {
                    console.log("因为搜索ptt爆出来的error")
                } finally {
                    const Back = this.searchResultBack.get(result.value.status);
                    if (Back) Back.call(this, result.value.content);
                }
            } else {
                this.Status = "failed"
                return
            }
        } catch (error) {
            console.log(error, "我是错误")
        }
    }
    public async getUserB30() {
        try {
            const { data: result } = await useAsyncData<RequestBox<Bast30>>("account_best30",
                () => $fetch(`botarcapi/user/best30`,
                    {
                        params: {
                            user: this.ArcId.replaceAll(" ", ""),
                            recent: 7,
                            overflow: 10,
                            withsonginfo: true
                        },
                        baseURL: BaseURL,
                        headers: {
                            Authorization
                        }
                    }),
                {
                    lazy: false,
                    server: true,
                });
            const list = [...result.value.content.best30_list, ...result.value.content.best30_overflow]
            for (let i = 0; i < list.length; i++) {
                const e = list[i]
                e.songLevel_bg = await getAccountSongLevel(e.score);
                e.songGrade_bg = await getAccountSongGrade(e.clear_type);
            }
            return { B30: list, B30songInfo: [...result.value.content.best30_songinfo, ...result.value.content.best30_overflow_songinfo] }
        } catch (error) {

        }
    }
    private AccountStatus_notFound(result: SearchValue) {
        this.Status = "failed";
        result.account_info.name = "查无此用户"
    }
    private AccountStatus_success(result: SearchValue) {
        this.Status = "success";
        this.account_Info = result
        return
    }
    public getAccount_info(): SearchValue["account_info"] {
        return { ...this.account_Info.account_info }
    }
    public getSongList(): SearchValue["recent_score"] {
        return [...this.account_Info.recent_score || []].map(e => { e.theme_color = [255, 255, 255]; return e })
    }
    public getSongInfo(): SearchValue["songinfo"] {
        return [...this.account_Info.songinfo]
    }
    public async destroy(): Promise<void> {
        this.account_Info = null;
        this.ArcId = null
    }
}