import { Text, View } from '@react-pdf/renderer';

import type { AboutDataListI } from '@/types/types';
import { styles } from './CvPdfAbout.styles';

interface CvPdfAboutProps {
    items: AboutDataListI[];
    title: string;
}

export const CvPdfAbout = ({ items, title }: CvPdfAboutProps) => {
    if (items.length === 0) {
        return null;
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.paragraphs}>
                {items.map((item) => (
                    <Text
                        key={item.id}
                        style={item.bold ? styles.bold : undefined}
                    >
                        {item.description}
                    </Text>
                ))}
            </View>
        </View>
    );
};
