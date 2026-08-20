import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 7,
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
