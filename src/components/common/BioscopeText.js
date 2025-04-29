import {Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import {fontSize} from '../../api/common';

const BioscopeText = props => {
    let style;
    switch (props.variant) {
        case 'extraLargeText':
            style = styles.extraLargeText;
            break;
        case 'largeText':
            style = styles.largeText;
            break;
        case 'largeTextLight':
            style = styles.largeTextLight;
            break;
        case 'mediumTextDark':
            style = styles.mediumTextDark;
            break;
        case 'mediumTextLight':
            style = styles.mediumTextLight;
            break;
        case 'smallText':
            style = styles.smallText;
            break;
        case 'extraSmallText':
            style = styles.extraSmallText;
            break;
        case 'currencyTextDark':
            style = styles.currencyDark;
            break;
        case 'currencyTextLight':
            style = styles.currencyLight;
            break;
        case 'discountText':
            style = styles.discountText;
            break;
        //#region lab test text styles
        case 'largeTextBold':
            style = styles.largeTextBold;
            break;
        case 'largeTextSemiBold':
            style = styles.largeTextSemiBold;
            break;
        case 'largeTextMedium':
            style = styles.largeTextMedium;
            break;
        case 'largeTextRegular':
            style = styles.largeTextMedium;
            break;
        case 'smallTextBold':
            style = styles.smallTextBold;
            break;
        case 'smallTextSemiBold':
            style = styles.smallTextSemiBold;
            break;
        case 'smallTextMedium':
            style = styles.smallTextMedium;
            break;
        case 'smallTextRegular':
            style = styles.smallTextRegular;
            break;
        //#endregion
        default:
            style = styles.commonText;
    }

    return (
        <Text
            style={[style, {...props.customStyle}]}
            {...props}
            selectable={props?.selectable || false}
            allowFontScaling={props?.allowFontScaling || false}>
            {props.title || props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    extraLargeText: {
        fontSize: fontSize(18),
        lineHeight: 27,
        color: colors.darkText,
        fontFamily: Platform.OS === 'ios' ? 'inter-bold' : 'Inter-Bold',
    },
    largeText: {
        fontSize: fontSize(14),
        lineHeight: 22.4,
        color: colors.darkText,
        fontFamily: Platform.OS === 'ios' ? 'inter-semiBold' : 'Inter-SemiBold',
    },
    largeTextLight: {
        fontSize: fontSize(14),
        lineHeight: 22.4,
        color: colors.darkText,
        fontFamily: Platform.OS === 'ios' ? 'inter-medium' : 'Inter-Medium',
    },
    mediumTextDark: {
        fontSize: fontSize(12),
        lineHeight: 19.2,
        color: colors.darkText,
        fontFamily: Platform.OS === 'ios' ? 'inter-medium' : 'Inter-Medium',
    },
    mediumTextLight: {
        fontSize: fontSize(12),
        lineHeight: 19.2,
        color: colors.gray600,
        fontFamily: Platform.OS === 'ios' ? 'inter-medium' : 'Inter-Medium',
    },
    smallText: {
        fontSize: fontSize(10),
        lineHeight: 16,
        color: colors.smallText,
        fontFamily: Platform.OS === 'ios' ? 'inter-regular' : 'Inter-Regular',
    },
    extraSmallText: {
        fontSize: fontSize(8),
        lineHeight: 12.8,
        color: colors.smallText,
        fontFamily: Platform.OS === 'ios' ? 'inter-semiBold' : 'Inter-SemiBold',
    },
    currencyDark: {
        fontSize: fontSize(14),
        lineHeight: 22.4,
        color: colors.darkText,
        fontFamily: Platform.OS === 'ios' ? 'inter-semiBold' : 'Inter-SemiBold',
    },
    currencyLight: {
        fontSize: fontSize(12),
        lineHeight: 19.2,
        color: colors.lightText,
        textDecorationLine: 'line-through',
        fontFamily: Platform.OS === 'ios' ? 'inter-regular' : 'Inter-Regular',
    },
    discountText: {
        fontSize: fontSize(12),
        lineHeight: 19.2,
        color: colors.discountText,
        fontFamily: Platform.OS === 'ios' ? 'inter-bold' : 'Inter-Bold',
    },
    commonText: {
        fontSize: fontSize(14),
        lineHeight: 15,
        color: colors.black,
        fontFamily: Platform.OS === 'ios' ? 'inter-regular' : 'Inter-Regular',
    },
    //#region lab test text styles
    largeTextBold: {
        fontSize: fontSize(14),
        lineHeight: 22.4,
        fontWeight: '700',
        fontFamily: Platform.OS === 'ios' ? 'inter-bold' : 'Inter-Bold',
    },
    largeTextSemiBold: {
        fontSize: fontSize(14),
        lineHeight: 22.4,
        fontWeight: '600',
        fontFamily: Platform.OS === 'ios' ? 'inter-semibold' : 'Inter-SemiBold',
    },
    largeTextMedium: {
        fontSize: fontSize(14),
        lineHeight: 22.4,
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'inter-medium' : 'Inter-Medium',
    },
    largeTextRegular: {
        fontSize: fontSize(14),
        lineHeight: 22.4,
        fontWeight: '400',
        fontFamily: Platform.OS === 'ios' ? 'inter-regular' : 'Inter-Regular',
    },
    smallTextBold: {
        fontSize: fontSize(12),
        lineHeight: 19.2,
        fontWeight: '700',
        fontFamily: Platform.OS === 'ios' ? 'inter-bold' : 'Inter-Bold',
    },
    smallTextSemiBold: {
        fontSize: fontSize(12),
        lineHeight: 19.2,
        fontWeight: '600',
        fontFamily: Platform.OS === 'ios' ? 'inter-semibold' : 'Inter-SemiBold',
    },
    smallTextMedium: {
        fontSize: fontSize(12),
        lineHeight: 19.2,
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'inter-medium' : 'Inter-Medium',
    },
    smallTextRegular: {
        fontSize: fontSize(12),
        lineHeight: 19.2,
        fontWeight: '400',
        fontFamily: Platform.OS === 'ios' ? 'inter-regular' : 'Inter-Regular',
    },
    //#endregion
});

export default BioscopeText;
