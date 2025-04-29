import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {textVariants} from './Variant';
import BioscopeText from './BioscopeText';
import colors from '../../constants/colors';
import {strings} from '../../utils/localization';

const BlockSectionTitle = ({title, onPressView, viewAllNone}) => {
    return (
        <View style={styles.titileview}>
            {!!title && (
                <BioscopeText title={title} variant={textVariants.largeText} />
            )}
            {viewAllNone ? null : (
                <TouchableOpacity onPress={onPressView}>
                    <BioscopeText
                        title={strings.view_all}
                        variant={textVariants.largeText}
                        customStyle={styles.viewAllText}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default BlockSectionTitle;

const styles = StyleSheet.create({
    titileview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    viewAllText: {
        color: colors.primaryColor,
        fontWeight: '500',
    },
});
