import { Text, View } from '@react-pdf/renderer';

import type { SkillsInputI } from '@/types/types';
import { styles } from './CvPdfSkills.styles';

interface CvPdfSkillsProps {
    skills: SkillsInputI;
    title: string;
    primaryLabel: string;
    secondaryLabel: string;
    aiLabel: string;
}

export const CvPdfSkills = ({
    skills,
    title,
    primaryLabel,
    secondaryLabel,
    aiLabel,
}: CvPdfSkillsProps) => {
    const groups = [
        [
            'primary',
            primaryLabel,
        ],
        [
            'secondary',
            secondaryLabel,
        ],
        [
            'ai',
            aiLabel,
        ],
    ] as const;

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.groups}>
                {groups.map(([key, label]) =>
                    skills[key].length > 0 ? (
                        <View key={key}>
                            <Text style={styles.label}>{label}</Text>
                            <Text style={styles.value}>
                                {skills[key]
                                    .map((item) => item.trim())
                                    .join(', ')}
                            </Text>
                        </View>
                    ) : null,
                )}
            </View>
        </View>
    );
};
