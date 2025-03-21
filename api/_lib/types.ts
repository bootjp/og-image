export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    title: string;
    description: string;
    theme: Theme;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}
