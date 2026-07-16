import styles from './Skill.module.scss';
import SkillItem from './SkillItem/SkillItem';

interface SkillProps {
    title: string;
    data: string[];
    tagType: 'primary' | 'secondary' | 'ai';
}

export const Skill = async ({ title, data, tagType }: SkillProps) => {
    if (data) {
        return (
            <div className={styles.section}>
                <div className={styles.title}>{title}</div>
                <div className={styles.list}>
                    {data.map((item) => (
                        <SkillItem key={item} text={item} tagType={tagType} />
                    ))}
                </div>
            </div>
        );
    }
};
