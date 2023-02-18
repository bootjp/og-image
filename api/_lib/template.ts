
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
    }
    return `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900');
 
    body{
      font-family: 'Noto Sans JP', sans-serif;
      padding: 0;
      margin: 50px;
      text-align: center;
      background: ${background};
      background-size: 100px 100px;
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    code {
        color: #D400FF;
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
    }

    .spacer {
        margin: 100px 0;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }
    .description {
        font-size: 28px;
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { title, description, theme, fontSize, images, widths, heights } = parsedReq;
    let s_title = sanitizeHtml(title);
    let s_description = sanitizeHtml(description);
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
              <div class="logo-wrapper">
                ${images.map((img, i) =>
                    getPlusSign(i) + getImage(img, widths[i], heights[i])
                ).join('')}
              </div>
            </div>
            <div class="spacer">
              <div class="heading">${emojify(s_title)}
            </div>
            <div class="spacer">
              <div class="description">${emojify(s_description)}
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width ='auto', height = '225') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
