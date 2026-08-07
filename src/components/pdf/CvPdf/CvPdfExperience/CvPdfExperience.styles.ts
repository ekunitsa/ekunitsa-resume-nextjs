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
    experience: {
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    name: {
        flex: 1,
        fontSize: 12,
        fontWeight: 500,
    },
    dates: {
        fontSize: 10,
    },
    meta: {
        color: '#475467',
        fontSize: 10,
        lineHeight: 1.9,
    },
    description: {
        fontSize: 12,
    },
    technologies: {
        fontSize: 12,
    },
});
