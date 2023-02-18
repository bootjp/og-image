import {FileType} from './types';
import {Browser} from "puppeteer";

const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

// cache browser
let _browser :Browser;

async function getPage() {
  if (_browser != null) {
    return await _browser.newPage()
  }

  const browser = await puppeteer.launch({
    // args: chromium.args,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],

    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  _browser = browser;

  return await _browser.newPage()
}

export async function getScreenshot(html: string, type: FileType) {
  const page = await getPage();
  await page.setViewport({width: 2048, height: 1170});
  await page.setContent(html);
  const file = await page.screenshot({type});
  return file;
}
