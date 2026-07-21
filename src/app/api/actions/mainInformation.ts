'use server';

import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import type { MainInformationI } from '@/types/types';

export async function postPatchMainInformation(data: MainInformationI) {
    try {
        await requireAdmin();

        const { language, name, role, place } = data;

        await prisma.mainInformation.upsert({
            where: {
                language,
            },
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

        return {
            ok: true,
        };
    } catch (error) {
        console.error(error);

        return {
            ok: false,
        };
    }
}

export async function getMainInformation(
    language: string,
): Promise<MainInformationI | null> {
    const response = await prisma.mainInformation.findUnique({
        where: {
            language,
        },
        select: {
            language: true,
            name: true,
            role: true,
            place: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}
