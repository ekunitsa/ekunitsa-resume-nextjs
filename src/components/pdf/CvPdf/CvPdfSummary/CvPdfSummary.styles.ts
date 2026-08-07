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
    paragraph: {
        marginBottom: 4,
    },
    bold: {
        fontWeight: 600,
    },
    italic: {
        fontStyle: 'italic',
    },
    underline: {
        textDecoration: 'underline',
    },
    link: {
        color: '#0d75c4',
        textDecoration: 'none',
    },
    list: {
        marginBottom: 4,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    listMarker: {
        width: 14,
    },
    listContent: {
        flex: 1,
    },
});
