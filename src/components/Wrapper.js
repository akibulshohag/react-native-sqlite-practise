import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';

import Loading from './Loading';
import colors from '../constants/colors';

function Wrapper(props) {
    return (
        <View style={[styles.containerStyle, props.style]}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            {props.loading && <Loading />}
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.bgColor,
    },
});

export {Wrapper};
