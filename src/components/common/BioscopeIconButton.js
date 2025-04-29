import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SvgUri, SvgXml} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BioscopeIconButton({
    onPress = () => {},
    customStyles = {},
    containerStyles = {},
    xml = null,
    uri = null,
    ionIcon = null,
    iconImage = null,
    size = 20,
    color = undefined,
    disabled = false,
}) {
    if (!uri && !xml && !ionIcon && !iconImage) {
        return;
    }

    if (uri) {
        return (
            <TouchableOpacity
                style={containerStyles}
                onPress={onPress}
                disabled={disabled}>
                <SvgUri
                    color={color}
                    style={customStyles}
                    uri={uri}
                    width={size}
                    height={size}
                />
            </TouchableOpacity>
        );
    }

    if (xml) {
        return (
            <TouchableOpacity
                style={containerStyles}
                onPress={onPress}
                disabled={disabled}>
                <SvgXml
                    color={color}
                    style={customStyles}
                    xml={xml}
                    width={size}
                    height={size}
                />
            </TouchableOpacity>
        );
    }

    if (ionIcon) {
        return (
            <TouchableOpacity
                style={containerStyles}
                onPress={onPress}
                disabled={disabled}>
                <Ionicons
                    style={customStyles}
                    name={ionIcon}
                    size={size}
                    color={color}
                />
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={containerStyles}
            onPress={onPress}
            disabled={disabled}>
            <FastImage
                source={iconImage}
                style={{
                    width: size,
                    height: size,
                    color: color,
                    ...customStyles,
                }}
            />
        </TouchableOpacity>
    );
}
