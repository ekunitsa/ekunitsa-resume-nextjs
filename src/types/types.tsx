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

export interface LanguagesItemI {
    title: string;
    level: string;
}

export interface ExperienceItemI {
    name: string;
    position: string;
    workTime?: string;
    dates?: string;
    term?: string;
    description?: string;
    technology?: string;
}

export interface SidebarItemI {
    link: string;
    title: string;
}

export interface SkillsInputI {
    language: string;
    primary: string[];
    secondary: string[];
}
