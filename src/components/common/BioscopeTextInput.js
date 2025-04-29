import React from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import colors from '../../constants/colors';
import Label from './Label';

export default function BioscopeTextInput({
    label,
    placeHolder,
    input,
    setInput,
    onFocus = () => {},
    onPressIn = () => {},
    keyboardType = 'default',
    required = false,
    customStyle = {},
    customTextInputStyle = {},
    multiline = false,
    selectionColor,
    autoFocus,
    maxLength,
    autoCorrect = false,
    autoCapitalize = 'none',
    textInputRef = null,
}) {
    return (
        <View style={[styles.container, customStyle]}>
            {label !== undefined && <Label title={label} required={required} />}

            <TextInput
                ref={textInputRef}
                onPressIn={onPressIn}
                onFocus={onFocus}
                multiline={multiline}
                numberOfLines={1}
                placeholderTextColor={colors.lightText}
                keyboardType={keyboardType}
                style={[styles.container__textinput, customTextInputStyle]}
                value={input}
                onChangeText={setInput}
                placeholder={placeHolder}
                textAlignVertical="center"
                selectionColor={selectionColor}
                autoFocus={autoFocus}
                underlineColorAndroid="transparent"
                maxLength={maxLength}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    container__textinput: {
        marginTop: 10,
        paddingVertical: Platform.OS === 'ios' ? 10 : 6,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: colors.lightGray,
        color: colors.lightText,
        paddingHorizontal: 16,
        fontFamily: Platform.OS === 'ios' ? 'inter-regular' : 'Inter-Regular',
        color: colors.darkText,
    },
});
