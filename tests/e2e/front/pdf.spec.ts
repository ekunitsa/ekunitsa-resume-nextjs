import { expect, test } from '@playwright/test';

test('serves a downloadable English PDF', async ({ request, isMobile }) => {
    test.skip(
        isMobile,
        'The same PDF endpoint is covered by the desktop project.',
    );

    const response = await request.get('/en/cv.pdf');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect(response.headers()['content-disposition']).toMatch(
        /attachment; filename=".+\.pdf"/,
    );

    const body = await response.body();

    expect(body.length).toBeGreaterThan(10_000);
    expect(body.subarray(0, 4).toString()).toBe('%PDF');
});
