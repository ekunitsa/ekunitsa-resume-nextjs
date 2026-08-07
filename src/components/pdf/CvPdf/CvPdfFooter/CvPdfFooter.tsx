import { Text } from '@react-pdf/renderer';
import { styles } from './CvPdfFooter.styles';

export const CvPdfFooter = () => (
    <Text
        fixed
        style={styles.footer}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    ></Text>
);
