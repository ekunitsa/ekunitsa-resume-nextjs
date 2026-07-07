import type messages from './src/locales/en.json';

declare module 'next-intl' {
    interface AppConfig {
        Messages: typeof messages;
    }
}
