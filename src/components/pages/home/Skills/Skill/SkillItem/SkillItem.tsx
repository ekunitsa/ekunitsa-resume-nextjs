import classNames from 'classnames';

import styles from './SkillItem.module.scss';

interface SkillItemI {
    text: string;
    tagType: 'primary' | 'secondary' | 'ai';
}

const SkillItem = ({ text, tagType }: SkillItemI) => {
    return (
        <div className={classNames(styles.item, styles[tagType])}>{text}</div>
    );
};

export default SkillItem;
