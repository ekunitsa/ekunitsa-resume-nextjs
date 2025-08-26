'use server';

import { prisma } from '@/lib/prisma';

import { AboutDataI } from '@/types/types';

export async function postPatchAbout(data: AboutDataI) {
    try {
        const { language, position, description, bold, id } = data;

        if (!language) {
            console.error('postPatchAbout: Invalid data object, !language');
            return { ok: false };
        }

        await prisma.about.upsert({
            where: { id },
            update: {
                position,
                description,
                bold,
            },
            create: {
                language,
                position,
                description,
                bold,
            },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}

export async function getAboutList(language: string) {
    const response = await prisma.about.findMany({
        where: { language },
        orderBy: {
            position: 'asc',
        },
        select: {
            id: true,
            language: false,
            position: true,
            description: true,
            bold: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}

export async function getAboutItem(id: number) {
    const response = await prisma.about.findUnique({
        where: { id },
        select: {
            id: true,
            language: true,
            position: true,
            description: true,
            bold: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}

export async function deleteAboutItem(id: number) {
    try {
        await prisma.about.delete({
            where: { id },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}
