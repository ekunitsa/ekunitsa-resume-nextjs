'use server';

import { prisma } from '@/lib/prisma';

import { LanguageDataI } from '@/types/types';

export async function postPatchLanguage(data: LanguageDataI) {
    try {
        const { language, position, label, level, id } = data;

        if (!language) {
            console.error('postPatchLanguage: Invalid data object, !language');
            return { ok: false };
        }

        await prisma.languages.upsert({
            where: { id },
            update: {
                position,
                label,
                level,
            },
            create: {
                language,
                position,
                label,
                level,
            },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}

export async function getLanguagesList(language: string) {
    const response = await prisma.languages.findMany({
        where: { language },
        orderBy: {
            position: 'asc',
        },
        select: {
            id: true,
            language: false,
            position: true,
            label: true,
            level: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}

export async function getLanguage(id: number) {
    const response = await prisma.languages.findUnique({
        where: { id },
        select: {
            id: true,
            language: true,
            position: true,
            label: true,
            level: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}

export async function deleteLanguage(id: number) {
    try {
        await prisma.languages.delete({
            where: { id },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}
