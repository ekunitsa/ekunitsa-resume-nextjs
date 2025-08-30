import classNames from 'classnames';

import styles from './Title.module.scss';

interface TitleProps {
    children: React.ReactNode;
    noMarginBottom?: boolean;
}

export const Title = ({ children, noMarginBottom }: TitleProps) => {
    return (
        <div
            className={classNames(styles.title, {
                [styles.noMarginBottom]: noMarginBottom,
            })}
        >
            {children}
        </div>
    );
};
