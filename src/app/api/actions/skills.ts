'use server';

import { NextResponse } from 'next/server';

import { SkillsInputI } from '@/types/types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function skillsPostPatch(data: SkillsInputI) {
    try {
        const { language, primary, secondary } = data;

        if (!language || !Array.isArray(primary) || !Array.isArray(secondary)) {
            return NextResponse.json(
                { error: 'Invalid data object' },
                { status: 400 },
            );
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
    const skills = await prisma.skills.findUnique({
        where: { language },
        select: {
            language: true,
            primary: true,
            secondary: true,
        },
    });

    if (!skills) {
        return null;
    }

    return skills;
}
