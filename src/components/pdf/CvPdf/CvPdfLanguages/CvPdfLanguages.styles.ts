import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    section: {
        marginTop: 20,
        width: '100%',
    },
    sectionTitle: {
        marginBottom: 6,
        paddingBottom: 3,
        borderBottom: '1 solid #dcf3ff',
        color: '#0d75c4',
        fontSize: 14,
        fontWeight: 600,
    },
    row: {
        flexDirection: 'row',
    },
    rows: {
        gap: 4,
    },
    name: {
        width: 110,
        fontWeight: 500,
    },
});
