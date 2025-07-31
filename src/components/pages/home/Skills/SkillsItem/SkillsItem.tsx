import classNames from 'classnames';

import styles from './SkillsItem.module.scss';

interface SkillsItemI {
    text: string;
    type: 'primary' | 'secondary';
}

const SkillsItem = ({ text, type }: SkillsItemI) => {
    return <div className={classNames(styles.item, styles[type])}>{text}</div>;
};

export default SkillsItem;
