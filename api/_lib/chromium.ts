import {FileType} from './types';

const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

async function getPage() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  return await browser.newPage()
}

export async function getScreenshot(html: string, type: FileType) {
  const page = await getPage();
  await page.setViewport({width: 2048, height: 1170});
  await page.setContent(html);
  const file = await page.screenshot({type});
  return file;
}
