import type { Config } from 'dompurify';
import DOMPurify from 'isomorphic-dompurify';

const SANITIZE_CONFIG: Config = {
    ALLOWED_TAGS: [
        'a',
        'b',
        'br',
        'em',
        'i',
        'li',
        'ol',
        'p',
        'strong',
        'u',
        'ul',
    ],
    ALLOWED_ATTR: [
        'href',
        'title',
    ],
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
    RETURN_TRUSTED_TYPE: false,
};

export const sanitizeHtml = (html: string) =>
    DOMPurify.sanitize(html, SANITIZE_CONFIG).trim();

export const sanitizeHtmlFragment = (html: string) =>
    DOMPurify.sanitize(html.replace(/\s+/g, ' '), {
        ...SANITIZE_CONFIG,
        RETURN_DOM_FRAGMENT: true,
    });
