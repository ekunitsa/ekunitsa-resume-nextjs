import { Text, View } from '@react-pdf/renderer';

import type { LanguageDataListI } from '@/types/types';
import { styles } from './CvPdfLanguages.styles';

interface CvPdfLanguagesProps {
    items: LanguageDataListI[];
    title: string;
}

export const CvPdfLanguages = ({ items, title }: CvPdfLanguagesProps) => {
    if (items.length === 0) {
        return null;
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.rows}>
                {items.map((item) => (
                    <View key={item.id} style={styles.row}>
                        <Text style={styles.name}>{item.label}</Text>
                        <Text>{item.level}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};
