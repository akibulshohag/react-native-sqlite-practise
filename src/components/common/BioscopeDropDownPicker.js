import React from 'react';
import BioscopeText from './BioscopeText';
import {textVariants} from './Variant';
import colors from '../../constants/colors';
import Picker from 'react-native-picker-select';
import BioscopeIconButton from './BioscopeIconButton';
import {StyleSheet, View} from 'react-native';

export default function BioscopeDropDownPicker({
    label = undefined,
    value = '',
    onValueChange = () => {},
    options = [],
    placeholder = {label: 'Select', value: null},
    required = false,
    customStyles = {},
    error = false,
}) {
    return (
        <View style={style.container}>
            {!!label && (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <BioscopeText
                        title={label}
                        variant={textVariants.mediumTextDark}
                        customStyle={{color: colors.darkText}}
                    />
                    {required ? (
                        <BioscopeText
                            title="*"
                            customStyle={{color: colors.lightRed}}
                            variant={textVariants.smallTextMedium}
                        />
                    ) : (
                        ''
                    )}
                </View>
            )}

            <Picker
                style={{
                    ...style,
                    ...(error && {
                        inputAndroid: {
                            ...style.inputAndroid,
                            borderColor: colors.lightRed,
                        },
                        inputIOS: {
                            ...style.inputIOS,
                            borderColor: colors.lightRed,
                        },
                    }),
                    ...customStyles,
                }}
                useNativeAndroidPickerStyle={false}
                pickerProps={{mode: 'dropdown'}}
                fixAndroidTouchableBug={true}
                placeholder={placeholder}
                value={value}
                onValueChange={onValueChange}
                items={options}
                Icon={() => (
                    <BioscopeIconButton
                        iconImage={require('../../img/icons/arrow_drop_down.png')}
                        size={20}
                    />
                )}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    inputIOS: {
        width: '100%',
        color: colors.darkText,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 6,
    },
    inputAndroid: {
        width: '100%',
        color: colors.darkText,
        marginTop: 10,
        paddingVertical: 6,
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 6,
    },
    iconContainer: {
        top: 20,
        right: 5,
    },
});
