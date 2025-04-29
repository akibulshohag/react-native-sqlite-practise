import {Text, StyleSheet, Platform, View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import {SvgUri, SvgXml} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

export default BioscopeButton = props => {
    let icon = '';
    if (props?.iconUri) {
        icon = (
            <SvgUri
                color={props?.iconColor}
                uri={props?.iconUri}
                width={props?.iconSize}
                height={props?.iconSize}
                style={props?.iconStyles}
            />
        );
    } else if (props?.iconXml) {
        icon = (
            <SvgXml
                color={props?.iconColor}
                xml={props?.iconXml}
                width={props?.iconSize}
                height={props?.iconSize}
                style={props?.iconStyles}
            />
        );
    } else if (props?.ionIcon) {
        icon = (
            <Ionicons
                style={props?.iconStyles}
                name={props?.ionIcon}
                size={props?.iconSize}
                color={props?.iconColor}
            />
        );
    } else if (props?.imgIcon) {
        icon = (
            <FastImage
                source={props?.imgIcon}
                style={props?.iconStyles}
                size={props?.iconSize}
                tintColor={props?.tintColor}
            />
        );
    }

    return (
        <TouchableOpacity
            style={[
                props.disabled
                    ? styles.disableBtn
                    : props.variant === 'outline'
                    ? styles.outlineBtn
                    : styles.solidBtn,
                {...props.customStyle},
            ]}
            onPress={e => !props.disabled && props.onPress(e)}
            {...props}>
            <Text
                style={[
                    props.variant === 'outline'
                        ? styles.outlineBtnText
                        : styles.solidBtnText,
                    {...props.textStyle},
                ]}>
                {props.title}
            </Text>
            {props?.iconEnabled && <View style={styles.iconView}>{icon}</View>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    solidBtn: {
        backgroundColor: colors.primaryColor,
        borderColor: colors.primaryColor,
        borderWidth: 1,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 6,
        flexDirection: 'row',
        marginHorizontal: '1%',
    },
    outlineBtn: {
        backgroundColor: 'transparent',
        borderColor: colors.primaryColor,
        borderWidth: 1,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 6,
        flexDirection: 'row',
        marginHorizontal: '1%',
        flexDirection: 'row',
    },
    disableBtn: {
        backgroundColor: colors.gray500,
        borderColor: colors.gray500,
        borderWidth: 1,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 6,
        flexDirection: 'row',
        marginHorizontal: '1%',
        flexDirection: 'row',
    },
    solidBtnText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22.4,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'inter-regular' : 'Inter-Regular',
    },
    outlineBtnText: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 22.4,
        color: colors.primaryColor,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'inter-regular' : 'Inter-Regular',
    },
    iconView: {
        marginHorizontal: 5,
    },
});
