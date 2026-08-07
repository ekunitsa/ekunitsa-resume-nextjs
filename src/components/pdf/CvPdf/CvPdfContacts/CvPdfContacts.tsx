import { Link, Text, View } from '@react-pdf/renderer';

import type { DashboardI, PDFContactItem } from '@/types/types';
import { CvPdfContactIcon } from './CvPdfContactIcon';
import { styles } from './CvPdfContacts.styles';

interface CvPdfContactsProps {
    place: string;
    dashboard: DashboardI;
}

export const CvPdfContacts = ({ place, dashboard }: CvPdfContactsProps) => {
    const contacts: PDFContactItem[] = [
        {
            icon: 'location',
            label: place,
        },
    ];

    if (dashboard.email) {
        contacts.push({
            icon: 'email',
            label: dashboard.email,
            href: `mailto:${dashboard.email}`,
        });
    }

    if (dashboard.telegram) {
        contacts.push({
            icon: 'telegram',
            label: `@${dashboard.telegram.split('/').pop()}`,
            href: dashboard.telegram,
        });
    }

    if (dashboard.linkedin) {
        contacts.push({
            icon: 'linkedin',
            label: 'LinkedIn',
            href: dashboard.linkedin,
        });
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                {contacts.map((item) => (
                    <View key={item.icon} style={styles.item}>
                        <CvPdfContactIcon name={item.icon} />
                        {item.href ? (
                            <Link src={item.href} style={styles.link}>
                                <Text style={styles.text}>{item.label}</Text>
                            </Link>
                        ) : (
                            <Text style={styles.text}>{item.label}</Text>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};
