import React from 'react';
import BioscopeText from './BioscopeText';
import {SvgUri, SvgXml} from 'react-native-svg';
import {StyleSheet, View} from 'react-native';
import colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function IconTextButton({
    onPress = () => {},
    customStyles = {},
    textStyles = {},
    iconStyles = {},
    text,
    iconXml = null,
    iconUri = null,
    ionIcon = null,
    iconColor = colors.green,
    iconSize = 24,
}) {
    if (!iconUri && !iconXml && !ionIcon) {
        return;
    }

    let icon = '';

    if (iconUri) {
        icon = (
            <SvgUri
                color={iconColor}
                uri={iconUri}
                width={iconSize}
                height={iconSize}
                style={iconStyles}
            />
        );
    } else if (iconXml) {
        icon = (
            <SvgXml
                color={iconColor}
                xml={iconXml}
                width={iconSize}
                height={iconSize}
                style={iconStyles}
            />
        );
    } else if (ionIcon) {
        icon = (
            <Ionicons
                style={iconStyles}
                name={ionIcon}
                size={iconSize}
                color={iconColor}
            />
        );
    }

    return (
        <View
            style={[styles.container, customStyles]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={onPress}>
            <BioscopeText
                title={text}
                variant="smallTextSemiBold"
                customStyle={{
                    color: colors.darkText,
                    marginRight: 4,
                    ...textStyles,
                }}
            />
            {icon}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 166,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 6,
    },
});
