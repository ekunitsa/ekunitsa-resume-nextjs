export type Locale = 'uk' | 'en';

export interface TopInfoLinksItemI {
    icon: string;
    link: string;
    title: string;
}

export interface ContactsItemI {
    icon: React.ReactNode;
    link?: string;
    title: string;
}
export interface AboutItemI {
    text: string;
    bold?: boolean;
}
