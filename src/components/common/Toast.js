import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import BioscopeText from './BioscopeText';
import colors from '../../constants/colors';
import {textVariants} from './Variant';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export default function Toast({
    message = '',
    setMessage = () => {},
    viewText = '',
    viewCallback = () => {},
    toastCustomStyle = {},
}) {
    if (!message) {
        return null;
    }

    useEffect(() => {
        if (!message) {
            return;
        }

        const timer = setTimeout(() => {
            setMessage('');
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, [message]);

    return (
        <Animated.View
            key={'toast-unique-key'}
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
            style={[styles.toastContainer, toastCustomStyle]}>
            <BioscopeText
                title={message}
                variant={textVariants.smallTextMedium}
                customStyle={styles.toastContainer__message}
            />
            {viewText !== '' && (
                <TouchableOpacity
                    style={styles.toastContainer__viewMessage}
                    onPress={viewCallback}>
                    <BioscopeText
                        title={viewText}
                        variant={textVariants.smallTextMedium}
                        customStyle={{
                            color: '#E6BB20',
                        }}
                    />
                </TouchableOpacity>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toastContainer: {
        height: 40,
        backgroundColor: colors.smallText,
        position: 'absolute',
        bottom: 10,
        left: 16,
        right: 16,
        borderRadius: 6,
        flexDirection: 'row',
        paddingLeft: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    toastContainer__message: {
        color: colors.white,
    },
    toastContainer__viewMessage: {
        height: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
});
