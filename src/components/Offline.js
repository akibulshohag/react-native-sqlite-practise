import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import BioscopeText from './common/BioscopeText';
import {textVariants} from './common/Variant';
import {fontSize} from '../api';
import colors from '../constants/colors';
import LottieView from 'lottie-react-native';
import nointernet from '../img/anim/nointernet.lottie';

const {width} = Dimensions.get('window');

function Offline() {
    return (
        <View style={styles.main}>
            <LottieView
                source={nointernet}
                style={styles.littieView}
                autoPlay
                loop
            />

            <View style={styles.textView}>
                <BioscopeText
                    title="No Internet"
                    variant={textVariants.extraLargeText}
                    customStyle={styles.titleText}
                />
                <BioscopeText
                    title="Please check your internet connection"
                    variant={textVariants.largeText}
                    style={styles.subText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50,
        backgroundColor: colors.white,
        zIndex: 1,
    },
    littieView: {
        width: width / 2,
        height: 200,
    },
    textView: {
        marginTop: 15,
        alignItems: 'center',
    },
    titleText: {
        fontSize: fontSize(20),
        marginBottom: 2,
    },
    subText: {
        color: colors.gray600,
        fontWeight: '400',
    },
});

export {Offline};
