import type { BrowserContext } from '@playwright/test';

export interface LocaleCase {
    path: string;
    lang: 'en' | 'uk';
    sections: string[];
    skillGroups: string[];
}

export type MarkedAdminEntity = 'about' | 'experience' | 'languages';

export interface CleanupMarkedAdminDataParams {
    entity: MarkedAdminEntity;
    markers: string[];
}

export type AdminStorageState = Awaited<
    ReturnType<BrowserContext['storageState']>
>;

export interface AdminWorkerFixtures {
    adminStorageState: AdminStorageState;
}
