'use server';

import { prisma } from '@/lib/prisma';

import { DashboardI } from '@/types/types';

export async function postPatchDashboard(data: DashboardI) {
    try {
        const {
            openToWork,
            startWorkDate,
            birthdayDate,
            showAge,
            linkedin,
            email,
            telegram,
            codewars,
            stackoverflow,
            github,
        } = data;

        await prisma.dashboard.upsert({
            where: { id: 1 },
            update: {
                openToWork,
                startWorkDate,
                birthdayDate,
                showAge,
                linkedin,
                email,
                telegram,
                codewars,
                stackoverflow,
                github,
            },
            create: {
                openToWork,
                startWorkDate,
                birthdayDate,
                showAge,
                linkedin,
                email,
                telegram,
                codewars,
                stackoverflow,
                github,
            },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}

export async function getDashboard() {
    const response = await prisma.dashboard.findUnique({
        where: { id: 1 },
        select: {
            openToWork: true,
            startWorkDate: true,
            birthdayDate: true,
            showAge: true,
            linkedin: true,
            email: true,
            telegram: true,
            codewars: true,
            stackoverflow: true,
            github: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}
