import { Link, Text, View } from '@react-pdf/renderer';

import type { DashboardI, PDFContactItem } from '@/types/types';
import { CvPdfContactIcon } from './CvPdfContactIcon';
import { styles } from './CvPdfContacts.styles';

interface CvPdfContactsProps {
    place: string;
    dashboard: DashboardI;
    websiteUrl: string;
    labels: {
        email: string;
        telegram: string;
        linkedin: string;
        website: string;
    };
}

export const CvPdfContacts = ({
    place,
    dashboard,
    websiteUrl,
    labels,
}: CvPdfContactsProps) => {
    const contacts: PDFContactItem[] = [
        {
            icon: 'location',
            label: place,
        },
    ];

    if (dashboard.email) {
        contacts.push({
            icon: 'email',
            label: `${labels.email}: ${dashboard.email}`,
            href: `mailto:${dashboard.email}`,
        });
    }

    if (dashboard.telegram) {
        contacts.push({
            icon: 'telegram',
            label: `${labels.telegram}: @${dashboard.telegram.split('/').pop()}`,
            href: dashboard.telegram,
        });
    }

    if (dashboard.linkedin) {
        contacts.push({
            icon: 'linkedin',
            label: `${labels.linkedin}: ${dashboard.linkedin}`,
            href: dashboard.linkedin,
        });
    }

    contacts.push({
        icon: 'website',
        label: `${labels.website}: ${websiteUrl}`,
        href: websiteUrl,
    });

    return (
        <View style={styles.wrapper}>
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
    );
};
