import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    if (!req.url) {
        throw new Error('Require url');
    }
    console.log('HTTP ' + req.url);
    const { query } = parse(req.url, true);
    const { fontSize, images, widths, heights, theme, title, description, ext } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }


    const parsedRequest: ParsedRequest = {
        fileType: ext === 'jpeg' ? ext : 'png',
        title: decodeURIComponent(typeof title === "string" ? title : ""),
        description: decodeURIComponent(typeof description === "string" ? description : ""),
        theme: theme === 'dark' ? 'dark' : 'light',
        fontSize: fontSize || '96px',
        images: getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
    };
    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}

