const chromium = require("@sparticuz/chromium");
interface Options {
    args: string[];
    executablePath: string;
    headless: boolean;
}

export async function getOptions() {
    let options: Options;

    options = {
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    };
    return options;
}
