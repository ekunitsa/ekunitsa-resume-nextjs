import styles from './Title.module.scss';

interface TitleProps {
    children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
    return <div className={styles.title}>{children}</div>;
};

export default Title;
