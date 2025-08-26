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
    label: string;
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

export interface DashboardI {
    openToWork: boolean;
    startWorkDate: string | null;
    birthdayDate: string | null;
    showAge: boolean;
    linkedin?: string | null;
    email?: string | null;
    telegram?: string | null;
    codewars?: string | null;
    stackoverflow?: string | null;
    github?: string | null;
}

export interface MainInformationI {
    language: string;
    name: string;
    role: string;
    place: string;
}

export interface TableHeaderI {
    columnName: string;
    tableHeader: string;
    size?: number;
}

export interface LanguageDataI {
    id: number;
    language: string;
    label: string;
    level: string;
    position: number;
}

export interface AboutDataI {
    id: number;
    language: string;
    description: string;
    bold: boolean;
    position: number;
}

export interface ExperienceDataI {
    id: number;
    language: string;
    position: number;
    companyName: string;
    role: string;
    workTime: string;
    workDateStart: string;
    workDateEnd: string;
    workNow: boolean;
    description: string;
    technology: string;
}
