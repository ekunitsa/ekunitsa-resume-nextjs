'use server';

import { DashboardI } from '@/types/types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function postPatchDashboard(data: DashboardI) {
    try {
        const { openToWork, startWorkDate, birthdayDate, showAge } = data;

        await prisma.dashboard.upsert({
            where: { id: 1 },
            update: {
                openToWork,
                startWorkDate,
                birthdayDate,
                showAge,
            },
            create: {
                openToWork,
                startWorkDate,
                birthdayDate,
                showAge,
            },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}

export async function getDashboard() {
    const dashboard = await prisma.dashboard.findUnique({
        where: { id: 1 },
        select: {
            openToWork: true,
            startWorkDate: true,
            birthdayDate: true,
            showAge: true,
        },
    });

    if (!dashboard) {
        return null;
    }

    return dashboard;
}
