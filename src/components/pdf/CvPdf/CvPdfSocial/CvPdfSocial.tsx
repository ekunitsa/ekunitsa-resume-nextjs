import { Link, Text, View } from '@react-pdf/renderer';

import type { DashboardI, PDFSocialItem } from '@/types/types';
import { styles } from './CvPdfSocial.styles';
import { CvPdfSocialIcon } from './CvPdfSocialIcon';

interface CvPdfSocialProps {
    dashboard: DashboardI;
}

export const CvPdfSocial = ({ dashboard }: CvPdfSocialProps) => {
    const social: PDFSocialItem[] = [];

    if (dashboard.codewars) {
        social.push({
            icon: 'codewars',
            label: 'Codewars',
            href: dashboard.codewars,
        });
    }

    if (dashboard.stackoverflow) {
        social.push({
            icon: 'stackoverflow',
            label: 'Stack Overflow',
            href: dashboard.stackoverflow,
        });
    }

    if (dashboard.github) {
        social.push({
            icon: 'github',
            label: 'GitHub',
            href: dashboard.github,
        });
    }

    if (social.length === 0) {
        return null;
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.divider} />

            <View style={styles.row}>
                {social.map((item) => (
                    <View key={item.icon} style={styles.item}>
                        <CvPdfSocialIcon name={item.icon} />
                        <Link src={item.href} style={styles.link}>
                            <Text style={styles.text}>{item.label}</Text>
                        </Link>
                    </View>
                ))}
            </View>
        </View>
    );
};
