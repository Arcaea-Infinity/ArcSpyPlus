import Nprocess from "@types/nprogress";
import Vconsole from "vconsole"
declare global {
    interface Window {
        NProgress: typeof Nprocess;
        VConsole: typeof Vconsole;
    }
}
