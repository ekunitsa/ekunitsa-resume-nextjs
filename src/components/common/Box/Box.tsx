import classNames from 'classnames';

import { Title } from '../Title/Title';

import styles from './Box.module.scss';

interface BoxProps {
    corners?: Array<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'>;
    fullHeight?: boolean;
    title?: string;
    className?: string;
    children: React.ReactNode;
}

export const Box = ({
    children,
    corners,
    fullHeight,
    title,
    className,
}: BoxProps) => {
    return (
        <div
            className={classNames(styles.wrapper, className, {
                [styles.cornerTopLeft]: corners?.includes('topLeft'),
                [styles.cornerTopRight]: corners?.includes('topRight'),
                [styles.cornerBottomLeft]: corners?.includes('bottomLeft'),
                [styles.cornerBottomRight]: corners?.includes('bottomRight'),
                [styles.fullHeight]: fullHeight,
            })}
        >
            {title && <Title>{title}</Title>}

            {children}
        </div>
    );
};
