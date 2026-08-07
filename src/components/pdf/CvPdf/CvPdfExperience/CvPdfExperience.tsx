import { Text, View } from '@react-pdf/renderer';

import type { ExperienceDataListI, Locale } from '@/types/types';
import { formatExperiencePeriod } from '@/utils/utils';
import { styles } from './CvPdfExperience.styles';

interface CvPdfExperienceProps {
    items: ExperienceDataListI[];
    locale: Locale;
    title: string;
    technologiesLabel: string;
    currentLabel: string;
}

export const CvPdfExperience = ({
    items,
    locale,
    title,
    technologiesLabel,
    currentLabel,
}: CvPdfExperienceProps) => {
    if (items.length === 0) {
        return null;
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>

            {items.map((item, index) => (
                <View
                    key={item.id}
                    style={
                        index < items.length - 1 ? styles.experience : undefined
                    }
                    wrap={false}
                >
                    <View style={styles.header}>
                        <Text style={styles.name}>
                            {`${item.companyName} - ${item.role}`}
                        </Text>
                        <Text style={styles.dates}>
                            {formatExperiencePeriod({
                                startDate: item.workDateStart,
                                endDate: item.workDateEnd,
                                isCurrent: item.workNow,
                                currentLabel,
                                locale,
                            })}
                        </Text>
                    </View>
                    {item.workTime && (
                        <Text style={styles.meta}>{item.workTime}</Text>
                    )}
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.technologies}>
                        {`${technologiesLabel}: ${item.technologies}`}
                    </Text>
                </View>
            ))}
        </View>
    );
};
