import path from 'node:path';

export const getFontPath = (fontFamily: string, fileName: string) =>
    path.join(process.cwd(), 'public', 'static', 'fonts', fontFamily, fileName);
