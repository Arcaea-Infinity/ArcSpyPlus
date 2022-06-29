
function colorfulImg(img: string) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1
    const ctx = canvas.getContext("2d");

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
    console.log(ppt, '我是用户ppt')
    const modules = import.meta.glob('../assets/img/account/rating/*.png');
    const index = PPTborder.findIndex(e => e(ppt));

    for (const path in modules) {
        if (path.indexOf(`${index}`) !== -1) {
            const mod = await modules[path]();
            return Promise.resolve(mod.default as string)
        }
    }
}