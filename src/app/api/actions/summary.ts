'use server';

import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { SummaryI } from '@/types/types';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

export async function postPatchSummary(data: SummaryI) {
    try {
        await requireAdmin();

        const language = data.language.trim();
        const content = sanitizeHtml(data.content.trim());

        if (!language || !content) {
            console.error('postPatchSummary: Invalid data object');
            return {
                ok: false,
            };
        }

        await prisma.summary.upsert({
            where: {
                language,
            },
            update: {
                content,
            },
            create: {
                language,
                content,
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

export async function getSummary(language: string): Promise<SummaryI | null> {
    const response = await prisma.summary.findUnique({
        where: {
            language,
        },
        select: {
            language: true,
            content: true,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}
