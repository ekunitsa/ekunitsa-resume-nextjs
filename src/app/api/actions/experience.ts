'use server';

import { prisma } from '@/lib/prisma';

import { ExperienceDataI } from '@/types/types';

export async function postPatchExperience(data: ExperienceDataI) {
    try {
        const {
            id,
            language,
            position,
            companyName,
            role,
            workTime,
            workDateStart,
            workDateEnd,
            workNow,
            description,
            technologies,
        } = data;

        if (!language) {
            console.error(
                'postPatchExperience: Invalid data object, !language',
            );
            return { ok: false };
        }

        await prisma.experience.upsert({
            where: { id },
            update: {
                position,
                companyName,
                role,
                workTime,
                workDateStart,
                workDateEnd,
                workNow,
                description,
                technologies,
            },
            create: {
                language,
                position,
                companyName,
                role,
                workTime,
                workDateStart,
                workDateEnd,
                workNow,
                description,
                technologies,
            },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}

export async function getExperienceList(language: string) {
    const response = await prisma.experience.findMany({
        where: { language },
        orderBy: {
            position: 'asc',
        },
        select: {
            id: true,
            language: false,
            position: true,
            companyName: true,
            role: true,
            workTime: true,
            workDateStart: true,
            workDateEnd: true,
            workNow: true,
            description: true,
            technologies: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}

export async function getExperienceItem(id: number) {
    const response = await prisma.experience.findUnique({
        where: { id },
        select: {
            id: true,
            language: true,
            position: true,
            companyName: true,
            role: true,
            workTime: true,
            workDateStart: true,
            workDateEnd: true,
            workNow: true,
            description: true,
            technologies: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}

export async function deleteExperienceItem(id: number) {
    try {
        await prisma.experience.delete({
            where: { id },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}
