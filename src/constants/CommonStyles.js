import {StyleSheet, Platform} from 'react-native';
import colors from './colors';

const commonStyles = StyleSheet.create({
    flexRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardShadow: {
        ...Platform.select({
            android: {elevation: 10, shadowOpacity: 0.15},
            ios: {shadowOpacity: 0.25},
        }),
        shadowOffset: {width: 0, height: 4},
        shadowColor: colors.gray600,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    scrollShadowEffect: {
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
        shadowColor: '#000',
        zIndex: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.0,
        elevation: 1,
    },
});

export default commonStyles;
