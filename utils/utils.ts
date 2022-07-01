
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