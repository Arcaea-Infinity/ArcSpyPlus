export type ResultCallBack = (result: SearchValue["content"]) => void;


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
            join_date: number;
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
        this.searchResultBack.set(-3, this.AccountStatus_notFound.bind(this));
        this.searchResultBack.set(0, this.AccountStatus_success.bind(this));
        // this.searchResultBack.forEach(e => {
        //     e = e.bind(that) 不知为何此处不生效
        // })
        this.ArcId = ArcId
    }

    public async onCreated(): Promise<void> {
        try {
            console.log("发起请求")
            // const { data: result, refresh, error } =
            const { data: result } = await useFetch<SearchValue>(
                `botarcapi/user/info?user=${this.ArcId.replaceAll(" ", "")}`,
                {
                    baseURL: "https://server.awbugl.top/",
                    async onResponseError(ctx) {
                        console.log(ctx, '我是错误')
                    },
                    async onRequest(ctx) {
                        console.log(ctx, '我是请求体')
                    },
                    async onRequestError(ctx) {
                        console.log(ctx, '我是请求拦截的错误')
                    },
                    async onResponse(ctx) {
                        console.log(ctx.response, '我是响应体')
                    },
                    headers: {
                        "user-agent": "ArcSpy3S2D2G1L2JB2F0"
                    }
                }
            );
            console.log(result.value, '我是最终拿到的值')
            if (result.value) {
                const Back = this.searchResultBack.get(result.value.status);
                if (Back) Back(result.value.content);
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
    }
    public getAccount_info(): SearchValue["content"]["account_info"] {
        if (this.Status === "success") {
            return this.account_Info.account_info
        } else {
            return {
                code: "1919",
                name: "查询失败",
                user_id: 114514,
                is_mutual: false,
                is_char_uncapped_override: false,
                is_char_uncapped: false,
                is_skill_sealed: false,
                rating: 616,
                join_date: Date.now(),
                character: 0,
            }
        }
    }
    public getSongList(): SearchValue["content"]["recent_score"] {
        if (this.Status === "success") {
            return this.account_Info.recent_score
        }
    }
}
