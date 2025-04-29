import React from 'react';
import BioscopeText from './BioscopeText';
import {textVariants} from './Variant';
import colors from '../../constants/colors';
import {StyleSheet, View, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function Avatar({title = '', imageUrl, size = 48}) {
    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    ...(!imageUrl && {
                        backgroundColor: colors.offGray,
                    }),
                },
            ]}>
            {imageUrl ? (
                <FastImage
                    source={{
                        uri: imageUrl,
                    }}
                    style={styles.container__image}
                />
            ) : (
                <BioscopeText
                    title={title[0] ? title[0] : ''}
                    variant={textVariants.largeTextBold}
                    customStyle={{
                        ...styles.container__text,
                        ...Platform.select({
                            ios: {
                                lineHeight: size * 0.93,
                            },
                            android: {
                                textAlignVertical: 'center',
                            },
                        }),
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
    },
    container__image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 50,
    },
    container__text: {
        height: '100%',
        color: colors.white,
        textAlign: 'center',
    },
});
