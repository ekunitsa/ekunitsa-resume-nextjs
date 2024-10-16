type EnMessages = typeof import('./src/locales/en.json');
type UkMessages = typeof import('./src/locales/uk.json');

declare interface IntlMessages extends UkMessages, EnMessages {}
