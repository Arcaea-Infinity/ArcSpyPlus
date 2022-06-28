import Nprocess from "@types/nprogress";
declare global {
    interface window {
        NProgress: Nprocess
    }
}