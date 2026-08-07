import { Font } from '@react-pdf/renderer';

import { getFontPath } from '@/utils/getFontPath';

export const registerCvPdfFonts = () => {
    Font.register({
        family: 'Helvetica',
        fonts: [
            {
                src: 'Helvetica',
                fontStyle: 'normal',
                fontWeight: 400,
            },
            {
                src: 'Helvetica-Bold',
                fontStyle: 'normal',
                fontWeight: 700,
            },
            {
                src: 'Helvetica-Oblique',
                fontStyle: 'italic',
                fontWeight: 400,
            },
            {
                src: 'Helvetica-BoldOblique',
                fontStyle: 'italic',
                fontWeight: 700,
            },
        ],
    });

    Font.register({
        family: 'Montserrat',
        fonts: [
            {
                src: getFontPath('montserrat', 'Montserrat-Regular.ttf'),
                fontWeight: 400,
            },
            {
                src: getFontPath('montserrat', 'Montserrat-Italic.ttf'),
                fontStyle: 'italic',
                fontWeight: 400,
            },
            {
                src: getFontPath('montserrat', 'Montserrat-Medium.ttf'),
                fontWeight: 500,
            },
            {
                src: getFontPath('montserrat', 'Montserrat-SemiBold.ttf'),
                fontWeight: 600,
            },
        ],
    });

    Font.registerHyphenationCallback((word) => [
        word,
    ]);
};
