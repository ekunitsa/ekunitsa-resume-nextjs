import styles from './SkillsItem.module.scss';

interface SkillsItemI {
    text: string;
}

const SkillsItem = ({ text }: SkillsItemI) => {
    return <>{text}</>;
};

export default SkillsItem;
