import React from 'react';
import {View} from 'react-native';
import BioscopeText from './BioscopeText';
import colors from '../../constants/colors';
import {textVariants} from './Variant';

export default function Label({title, required}) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <BioscopeText
                title={title}
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
    );
}
