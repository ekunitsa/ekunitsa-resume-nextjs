'use server';

import { DashboardI } from '@/types/types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function postPatchDashboard(data: DashboardI) {
    try {
        const { openToWork } = data;

        await prisma.globalSettings.upsert({
            where: { id: 1 },
            update: {
                openToWork,
            },
            create: {
                openToWork,
            },
        });

        return { ok: true };
    } catch (error) {
        console.error(error);

        return { ok: false };
    }
}

export async function getDashboard() {
    const dashboard = await prisma.globalSettings.findUnique({
        where: { id: 1 },
        select: {
            openToWork: true,
        },
    });

    if (!dashboard) {
        return null;
    }

    return dashboard;
}
