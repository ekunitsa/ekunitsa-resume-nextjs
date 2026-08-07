import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
    },
    divider: {
        width: 32,
        marginBottom: 10,
        borderTop: '1px solid #dcf3ff',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        columnGap: 14,
        rowGap: 5,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 4,
    },
    text: {
        color: '#000',
        fontSize: 10,
        lineHeight: 1.2,
    },
    link: {
        color: '#000',
        textDecoration: 'none',
    },
});
