import {
    Alert,
    Dimensions,
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {textVariants} from './Variant';
import colors from '../../constants/colors';
import BioscopeText from './BioscopeText';
import {TouchableOpacity} from 'react-native';
const {width} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';

const BioscopePicker = props => {
    const [initialIndex, setInitialIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        if (props?.selectedValue) {
            const index = props?.data.findIndex(
                item => item.value === props?.selectedValue,
            );
            setInitialIndex(index);
        }
    }, [props?.selectedValue]);

    return (
        <Modal
            visible={props.visible}
            animationType="slide"
            translucent={true}
            transparent={true}>
            <View style={styles.qtyPickerModal}>
                <SafeAreaView>
                    <View style={styles.pickerView}>
                        <View style={styles.pickerHeader}>
                            <BioscopeText
                                variant={textVariants.mediumTextDark}
                                customStyle={styles.pickerHeaderText}
                                title={props?.title}
                            />
                            <TouchableOpacity onPress={props.onClose}>
                                <Ionicons
                                    name="close"
                                    size={25}
                                    color={colors.white}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pickerListView}>
                            {!!props.selectedValue && !props.hideRemove && (
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            'Remove',
                                            `Are you sure you want to remove the current selection?`,
                                            [
                                                {text: 'NO'},
                                                {
                                                    text: 'YES',
                                                    onPress:
                                                        props?.onPressRemove,
                                                },
                                            ],
                                            {cancelable: true},
                                        );
                                    }}
                                    style={styles.pickerRemove}>
                                    <BioscopeText
                                        title="Remove"
                                        variant={textVariants.mediumTextDark}
                                        customStyle={styles.pickerRemoveText}
                                    />
                                </TouchableOpacity>
                            )}
                            <FlatList
                                ref={flatListRef}
                                data={props?.data}
                                initialNumToRender={200}
                                keyExtractor={(_, index) => index?.toString()}
                                initialScrollIndex={initialIndex}
                                onScrollToIndexFailed={({
                                    index,
                                    averageItemLength,
                                }) => {
                                    flatListRef.current?.scrollToOffset({
                                        offset: index * averageItemLength,
                                        animated: true,
                                    });
                                }}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() =>
                                            props.onValueChange(item)
                                        }
                                        style={[
                                            styles.pickerlistTextView,
                                            props.selectedValue ===
                                                item.value && {
                                                backgroundColor:
                                                    colors.primaryColorLight,
                                            },
                                        ]}>
                                        <BioscopeText
                                            title={item.label}
                                            variant={
                                                textVariants.mediumTextDark
                                            }
                                            numberOfLines={1}
                                            customStyle={
                                                props.selectedValue ===
                                                    item.value && {
                                                    color: colors.primaryColor,
                                                }
                                            }
                                        />
                                        {props.selectedValue === item.value && (
                                            <Ionicons
                                                name="ios-checkmark-circle"
                                                size={17}
                                                color={colors.primaryColor}
                                                style={styles.pickerListIcon}
                                            />
                                        )}
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    qtyPickerModal: {
        backgroundColor: '#11295090',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    pickerView: {
        backgroundColor: colors.white,
        width: width * 0.6,
        borderRadius: 6,
    },
    pickerHeader: {
        backgroundColor: colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        padding: 10,
    },
    pickerHeaderText: {
        color: colors.white,
        fontWeight: '600',
    },
    pickerListView: {
        backgroundColor: colors.white,
        maxHeight: 260,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        marginBottom: 10,
    },
    pickerRemove: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.lighterGray,
        paddingHorizontal: 10,
    },
    pickerRemoveText: {
        color: colors.lightRed,
        fontWeight: '400',
    },

    pickerlistTextView: {
        marginBottom: 2,
        paddingVertical: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: colors.lighterGray,
    },
    pickerListIcon: {
        alignSelf: 'center',
    },
});

export default BioscopePicker;
