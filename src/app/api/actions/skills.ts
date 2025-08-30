'use server';

import { prisma } from '@/lib/prisma';

import { SkillsInputI } from '@/types/types';

export async function postPatchSkills(data: SkillsInputI) {
    try {
        const { language, primary, secondary } = data;

        if (!language || !Array.isArray(primary) || !Array.isArray(secondary)) {
            console.error('postPatchSkills: Invalid data object');
            return { ok: false };
        }

        await prisma.skills.upsert({
            where: { language },
            update: {
                primary,
                secondary,
            },
            create: {
                language,
                primary,
                secondary,
            },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}

export async function getSkills(language: string) {
    const response = await prisma.skills.findUnique({
        where: { language },
        select: {
            language: true,
            primary: true,
            secondary: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}
