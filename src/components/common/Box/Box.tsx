import classNames from 'classnames';

import Title from '../Title/Title';

import styles from './Box.module.scss';

interface BoxProps {
    corners?: Array<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'>;
    height100percent?: boolean;
    title?: string;
    children: React.ReactNode;
}

const Box = ({ children, corners, height100percent, title }: BoxProps) => {
    return (
        <div
            className={classNames(styles.wrapper, {
                [styles.cornerTopLeft]: corners?.includes('topLeft'),
                [styles.cornerTopRight]: corners?.includes('topRight'),
                [styles.cornerBottomLeft]: corners?.includes('bottomLeft'),
                [styles.cornerBottomRight]: corners?.includes('bottomRight'),
                [styles.height100percent]: height100percent,
            })}
        >
            {title && <Title>{title}</Title>}

            {children}
        </div>
    );
};

export default Box;
