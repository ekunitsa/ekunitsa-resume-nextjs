'use server';

import { prisma } from '@/lib/prisma';

import { MainInformationI } from '@/types/types';

export async function postPatchMainInformation(data: MainInformationI) {
    try {
        const { language, name, role, place } = data;

        await prisma.mainInformation.upsert({
            where: { language },
            update: {
                name,
                role,
                place,
            },
            create: {
                language,
                name,
                role,
                place,
            },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}

export async function getMainInformation(language: string) {
    const mainInformation = await prisma.mainInformation.findUnique({
        where: { language },
        select: {
            name: true,
            role: true,
            place: true,
        },
    });

    if (!mainInformation) {
        return null;
    }

    return mainInformation;
}
