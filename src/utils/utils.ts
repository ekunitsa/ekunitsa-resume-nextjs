import dayjs from 'dayjs';
import { routing } from '@/configs/i18n/routing';

import 'dayjs/locale/en';
import 'dayjs/locale/uk';

export const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

interface FormatExperiencePeriodParams {
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    currentLabel: string;
    locale: string;
}

export const formatExperiencePeriod = ({
    startDate,
    endDate,
    isCurrent,
    currentLabel,
    locale,
}: FormatExperiencePeriodParams) => {
    const formatDate = (date: string) =>
        capitalizeFirst(dayjs(date).locale(locale).format('MMMM YYYY'));

    const formattedEndDate = isCurrent
        ? capitalizeFirst(currentLabel)
        : formatDate(endDate || '');

    return `${formatDate(startDate)} - ${formattedEndDate}`;
};

export const getLocaleFromUrl = (pathname: string) =>
    routing.locales.find(
        (locale) =>
            pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    );
