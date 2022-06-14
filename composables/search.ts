import { Ref } from "vue";

export type ResultCallBack = (result: SearchValue["content"]) => void;


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
    time_played: number;
    near_count: number;
    miss_count: number;
    perfect_count: number;
    shiny_perfect_count: number;
}

export interface SearchValue {
    status: 0 | -3;
    message: string;
    content?: {
        account_info: {
            code: string;
            name: string;
            user_id: number;
            is_mutual: boolean;
            is_char_uncapped_override: boolean;
            is_char_uncapped: boolean;
            is_skill_sealed: boolean;
            rating: number;
            join_date: number | string;
            character: number;
        };
        recent_score: RecentScoreType[];
    };
}

export default class search_Account {
    private account_Info: SearchValue["content"];
    private searchResultBack = new Map<SearchValue["status"], ResultCallBack>();
    private ArcId: string = "";
    private Status: "success" | "failed" | "padding" = "padding"
    constructor(ArcId: string) {
        this.searchResultBack.set(-3, this.AccountStatus_notFound);
        this.searchResultBack.set(0, this.AccountStatus_success);
        // this.searchResultBack.forEach(e => {
        //     e = e.bind(that) 不知为何此处不生效
        // })
        this.ArcId = ArcId
    }

    public async onCreated(): Promise<void> {
        try {
            console.log(this.ArcId, '被查询的arcId')
            const { data: result } = await useAsyncData<SearchValue>(
                "account_info",
                () => $fetch(`botarcapi/user/info`,
                    {
                        params: {
                            user: this.ArcId.replaceAll(" ", "")
                        },
                        retry: 3,
                        baseURL: "https://server.awbugl.top/",
                        async onRequestError(e) {
                            console.log(e, "请求错误")
                        },
                        async onResponseError(e) {
                            console.log(e, "响应错误")
                        },
                        headers: {
                            "user-agent": "ArcSpy3S2D2G1L2JB2F0"
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
                            },
                        }
                    }
                }
            );
            if (result.value) {
                const Back = this.searchResultBack.get(result.value.status);
                if (Back) Back.call(this, result.value.content);
                return
            } else {
                this.Status = "failed"
                return
            }
        } catch (error) {
            console.log(error)
        }
    }
    private AccountStatus_notFound(result: SearchValue["content"]) {
        this.Status = "failed";
        result.account_info.name = "查无此用户"
    }
    private AccountStatus_success(result: SearchValue["content"]) {
        this.Status = "success";
        this.account_Info = result
        return
    }
    public getAccount_info(): Ref<SearchValue["content"]["account_info"]> {
        return ref(this.account_Info.account_info)
    }
    public getSongList(): Ref<SearchValue["content"]["recent_score"]> {
        return ref(this.account_Info.recent_score || [])
    }
}
