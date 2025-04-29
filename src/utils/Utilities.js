import _, {debounce} from 'lodash';
import {DateTime} from 'luxon';
import {Alert, Linking, PermissionsAndroid} from 'react-native';
import {getMedicineRealTimeProductData} from '../api/routeApi';
import {ToastAndroid, Platform} from 'react-native';
import {store} from '../redux';
import colors from '../constants/colors';
import {
    defaultbeauty,
    defaultfood,
    defaulthealthcare,
    defaultmedicine,
    defaultpet,
} from '../img/getImage';
import pluralize from 'pluralize';
import range from 'lodash/range';
import {useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import { navigationRef } from '../api/common';

export const b2bUser = () => {
    const {user, b2bData} = store.getState().app;
    return !!user?.u_pharmacy_id && b2bData?.status === 'approved'
        ? true
        : false;
};

export const extractBarCodeId = (data, prefix) => {
    if (data.startsWith(prefix)) {
        let reg = new RegExp(`\\b${prefix}([0-9]+)$\\b`);
        let target = data.match(reg);
        if (!!target) {
            return parseInt(target[1]);
        }
    }
    return null;
};

export const getRecentYear = numberOfYear => {
    let years = [];
    let currentYear = DateTime.now().toFormat('yyyy');
    for (let i = 0; i <= numberOfYear; i++) {
        years.push(currentYear - i);
    }
    return years;
};

export const generateMonthNameAndColorCodeByValue = value => {
    switch (value) {
        case '01':
            value = {
                monthName: 'January',
                colorCode: '#1BBAF7',
            };
            break;
        case '02':
            value = {
                monthName: 'February',
                colorCode: '#3DCF9E',
            };

            break;
        case '03':
            value = {
                monthName: 'March',
                colorCode: '#FFA449',
            };
            break;
        case '04':
            value = 'April';
            value = {
                monthName: 'April',
                colorCode: '#ED637B',
            };
            break;
        case '05':
            value = {
                monthName: 'May',
                colorCode: '#B559CA',
            };
            break;
        case '06':
            value = {
                monthName: 'June',
                colorCode: '#E95AB0',
            };
            break;
        case '07':
            value = {
                monthName: 'July',
                colorCode: '#008069',
            };
            break;
        case '08':
            value = {
                monthName: 'August',
                colorCode: '#6754DB',
            };
            break;
        case '09':
            value = {
                monthName: 'September',
                colorCode: '#B559CA',
            };
            break;
        case '10':
            value = {
                monthName: 'October',
                colorCode: '#ED637B',
            };
            break;
        case '11':
            value = {
                monthName: 'October',
                colorCode: '#3DCF9E',
            };
            break;
        case '12':
            value = {
                monthName: 'December',
                colorCode: '#1BBAF7',
            };
            break;
        default:
            value = {
                monthName: 'N/A',
                colorCode: '#10837d',
            };
            break;
    }
    return value;
};

export const errorMessageHandler = response => {
    let errorMessage = 'Something went wrong';
    if (!!response?.message) {
        errorMessage = response.message;
        return Alert.alert('Failed', errorMessage, [{text: 'OK'}], {
            cancelable: true,
        });
    } else if (!_.isEmpty(res?.error)) {
        const errorArray = Object.values(response?.error);
        errorMessage = errorArray.join(', ');
        return Alert.alert('Failed', errorMessage, [{text: 'OK'}], {
            cancelable: true,
        });
    } else {
        return Alert.alert('Failed', errorMessage, [{text: 'OK'}], {
            cancelable: true,
        });
    }
};

export const handleRealtimeProductData = async (response, callback, type) => {
    const ids = [];
    if (type == 'nested') {
        response.data?.forEach(item => {
            if (item.type.startsWith('sideScroll-')) {
                item.data.forEach(element => {
                    ids.push(element.id);
                });
            }
        });
    } else if (type == 'singleProduct') {
        ids.push(response.id);
    } else {
        response?.forEach(element => {
            ids.push(element.id);
        });
    }
    const params = {
        m_ids: ids.join(','),
    };

    try {
        const data = await getMedicineRealTimeProductData(params);
        if (data.status === 'success') {
            callback(prev => {
                return {
                    ...prev,
                    ...data.data,
                };
            });
        }
    } catch (error) {
        console.log('getMedicineRealTimeProductData error', error);
    }
};

export const getRealTimePriceByMedicineId = async data => {
    const same_generic_ids = data.same_generic.map(item => item.id) || [];
    const params = {
        m_ids: same_generic_ids.join(','),
    };
    const {data: same_generic_realtimeData} =
        await getMedicineRealTimeProductData(params);

    return {
        data: {
            ...data,
            same_generic: data.same_generic?.map(item => {
                return {
                    ...item,
                    ...same_generic_realtimeData[item.id],
                };
            }),
        },
    };
};

export const customizePrinterUrl = printerUrl => {
    printerUrl = printerUrl.trim().replace(/^\/+|\/+$/g, '');
    if (
        !printerUrl.startsWith('http://') &&
        !printerUrl.startsWith('https://')
    ) {
        printerUrl = 'https://' + printerUrl;
    }
    return printerUrl;
};

export const apiNavLinkHandler = async (item, loginHelper, setRedirectState) => {
    console.log('item.alt', item.alt);            

    const {app} = store.getState();
    if (!item?.is_external) {
        if (item?.route == 'public') {
            navigationRef?.current?.navigate(item?.link, {...item?.params});
        } else {
            if (!!app.user) {
                navigationRef?.current?.navigate(item?.link, {...item?.params});
            } else {
                item?.link && setRedirectState(item?.link);
                loginHelper?.open();
            }
        }
    } else {
        if (item?.link === 'Whatsapp') {
            const url = `whatsapp://send?phone=${item.alt}`
            try {          
               await Linking.openURL(url);
            } catch (error) {
                Alert.alert('Sorry ! Your mobile may not have whatsapp installed');
            }
        } else if (item?.link === 'Call To Order') {
            Linking.openURL(`tel:${item.alt}`);
        }

        // Linking.canOpenURL(item?.link)
        //     ?.then(supported => {
        //         if (supported) {
        //             return Linking.openURL(item?.alt).catch(() => null);
        //         }
        //     })
        //     .catch(error => {
        //         console.log('open url ', error);
        //     });
    }
};

export const convertNumberToEnBN = number => {
    let convertedNumber = _.toNumber(number);
    if (isNaN(convertedNumber)) {
        return number;
    } else {
        const app = store.getState().app;
        if (app?.language == 'bn') {
            return new Intl.NumberFormat('bn-BD').format(convertedNumber);
        }
        return new Intl.NumberFormat('en').format(convertedNumber);
    }
};

export const getFormattedDate = (isoTimestamp, onlyDate = false) => {
    if (!isoTimestamp) return '';

    if (onlyDate === true) {
        return DateTime.fromISO(isoTimestamp).toFormat('dd/LL/yyyy');
    }

    return DateTime.fromISO(isoTimestamp).toFormat('dd/LL/yyyy hh:mm a');
};

/**
 *
 * @param {string} dateOfBirth 1999-05-25 (year-month-date)
 * @returns {number} age 24 (ceil value)
 */
export const getAge = dateOfBirth => {
    if (!dateOfBirth) {
        return '';
    }

    const dateTimeObj = DateTime.fromFormat(dateOfBirth, 'yyyy-MM-dd');

    const diff = dateTimeObj.diffNow('years');

    const age = Math.ceil(Math.abs(diff.years));

    return age;
};

/**
 * detecting scroll view bottom
 */
export const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
}) => {
    const paddingToBottom = 20;
    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    );
};

export const notifyMessage = msg => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
        Alert.alert(msg);
    }
};

/**
 * Detect Dynamic Island
 * NOTE: DeviceInfo.hasDynamicIsland not working for 15 series (lib v10.13.1)
 */
export const hasDynamicIsland = () => {
    const currentDeviceId = DeviceInfo.getDeviceId(),
        dynamicIslandIds = [
            'iPhone15,2', // 14 pro
            'iPhone15,3', // 14 pro max
            'iPhone15,4', // 15
            'iPhone15,5', // 15 plus
            'iPhone16,1', // 15 pro
            'iPhone16,2', // 15 pro max
            'iPhone17,3', // iPhone 16
            'iPhone17,4', // iPhone 16 Plus
            'iPhone17,1', // iPhone 16 Pro
            'iPhone17,2', // iPhone 16 Pro Max
        ];

    if (Platform.OS === 'ios' && dynamicIslandIds.includes(currentDeviceId)) {
        return true;
    }

    return false;
};

/**
 * checks the device has write access or not, if not then asks for it
 * @returns {boolean} true(if device ok for write) or false(write permission forbidden)
 */
export const checkDeviceWritePermission = async () => {
    if (Platform.OS === 'ios') {
        return true;
    }

    const AndroidVer = Platform.constants['Release'];

    /**
     * android version equal or upper than 11, needs no write permission
     * ref => https://developer.android.com/reference/android/Manifest.permission#WRITE_EXTERNAL_STORAGE
     */
    if (Number(AndroidVer.split('.')[0]) >= 11) {
        return true;
    }

    try {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );

        if (granted) {
            return true;
        }

        const newlyGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'Storage permission is required',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );

        if (newlyGranted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            throw Error('Download permsion required');
        }
    } catch (error) {
        Alert.alert('', 'Download permsion required');
        return false;
    }
};

export const USE_NATIVE_DRIVER = Platform.select({
    ios: true,
    android: Platform.constants?.Release !== '12',
    default: true,
});

export const getLabStatusChipColor = statusKey => {
    let color = '';

    switch (statusKey) {
        case 'pending':
            color = colors.orange;
            break;
        case 'processing':
            color = colors.orange;
            break;
        case 'confirmed':
            color = colors.green;
            break;
        case 'collected':
            color = '#8C62FF';
            break;
        case 'scheduled':
            color = '#E6BB20';
            break;
        case 'rescheduled':
            color = '#0062FF';
            break;
        case 'cancelled':
            color = colors.lightRed;
            break;
        case 'completed':
            color = colors.primaryColor;
            break;
        default:
            color = colors.primaryColor;
            break;
    }

    return color;
};
export function numberToKString(number) {
    if (number < 1000) {
        return number.toString();
    }

    const units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    const log1000 = Math.floor(Math.log10(number) / 3);
    const scaledNumber = number / Math.pow(1000, log1000);
    const roundedScaledNumber = Math.round(scaledNumber * 10) / 10; // Round to the nearest tenth

    return roundedScaledNumber % 1 === 0
        ? roundedScaledNumber.toFixed(0) + units[log1000]
        : roundedScaledNumber.toFixed(2) + units[log1000];
}

export const generateImgSrc = product => {
    const defaultImage = getDefaultImage(product?.p_type);
    let imgSrc = '';

    if (
        !_.isEmpty(!!product?.pv && product?.pv[0]?.attachedFiles_pv_images) &&
        !!product?.pv[0]?.attachedFiles_pv_images[0]?.src
    ) {
        imgSrc = {
            uri:
                !!product?.pv &&
                product?.pv[0]?.attachedFiles_pv_images[0]?.src,
        };
    } else {
        imgSrc = {
            uri: !!product?.pv && product?.attachedFiles_p_images[0]?.src,
        };
    }

    if (!imgSrc || imgSrc?.uri === '' || !imgSrc?.uri) {
        imgSrc = defaultImage;
    }

    return imgSrc;
};

export const backAction = () => {
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;
    if (navigationRef?.current?.canGoBack() === true) {
        navigationRef?.current?.goBack;
    } else {
        if (currentRouteName === 'HomeBlock') {
            Alert.alert('', 'Are you sure you want to close App?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
            ]);
            return true;
        } else {
            navigationRef?.current?.reset({
                index: 0,
                routes: [{name: 'HomeBlock'}],
            });
            return true;
        }
    }
};

const getLabel = (baseUnitLabel, i, baseUnitMultipalier) => {
    if (baseUnitLabel === 'Injection') {
        return `${i * baseUnitMultipalier} ${pluralize(baseUnitLabel, i)}`;
    } else if (baseUnitLabel === '') {
        return `${baseUnitLabel}`;
    } else if (baseUnitLabel === 'Tablet') {
        return `${i * baseUnitMultipalier} ${pluralize(baseUnitLabel, i)}`;
    } else if (baseUnitLabel === 'Capsules') {
        return `${i * baseUnitMultipalier} ${pluralize(baseUnitLabel, i)}`;
    }
    // else if (baseUnitLabel.includes('bot')) {
    //     return `${i * baseUnitMultipalier} x ${pluralize(baseUnitLabel, i)}`;
    // }
    else {
        return `${i * baseUnitMultipalier} x ${baseUnitLabel}`;
    }
};

export const testLabels = (
    salesUnitLabel,
    baseUnitMultipalier,
    baseUnitLabel,
    min,
    max,
) => {
    const quantityList = range(min, max + 1).map(i => {
        const newLabel = getLabel(baseUnitLabel, i, baseUnitMultipalier);

        return {
            label: `${
                salesUnitLabel === baseUnitLabel
                    ? i
                    : salesUnitLabel
                    ? baseUnitLabel === `1's Pack`
                        ? newLabel
                        : `${i * baseUnitMultipalier} ${pluralize(
                              baseUnitLabel,
                              true,
                          )}`
                    : ''
            } ${
                salesUnitLabel
                    ? `(${pluralize(salesUnitLabel, i, true)})`
                    : newLabel
            } `,
            value: i,
        };
    });
    return quantityList;
};

export const generatePickerQunaity = (
    minQty,
    maxQty,
    salesUnitLabel,
    baseUnitMultipalier,
    baseUnitLabel,
) => {
    const quantityList = range(minQty, maxQty + 1).map(i => {
        const newLabel = getLabel(baseUnitLabel, i, baseUnitMultipalier);
        return {
            label: `${
                salesUnitLabel === baseUnitLabel
                    ? i
                    : salesUnitLabel
                    ? `${i * baseUnitMultipalier} ${pluralize(
                          baseUnitLabel,
                          true,
                      )}`
                    : ''
            } ${
                salesUnitLabel
                    ? `(${pluralize(salesUnitLabel, i, true)})`
                    : newLabel
            }
`,
            value: i,
        };
    });
    return quantityList;
};

export const formattedDate = dateData => {
    const date = new Date(dateData).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    return date;
};

export const useInterval = (callback, timeout, dependencies) => {
    useEffect(() => {
        const intervalId = setInterval(callback, timeout);

        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};

export const generateActiveDetils = (activeVariant, isB2bUser) => {
    const minQty = isB2bUser
        ? activeVariant?.pv_b2b_min_qty
        : activeVariant?.pv_b2c_min_qty;
    const maxQty = isB2bUser
        ? activeVariant?.pv_b2b_max_qty
        : activeVariant?.pv_b2c_max_qty;

    const salesUnitLabel = isB2bUser
        ? activeVariant?.pu_b2b_sales_unit_label ===
          activeVariant?.pu_base_unit_label
            ? ''
            : activeVariant?.pu_b2b_sales_unit_label
        : activeVariant?.pu_b2c_sales_unit_label ===
          activeVariant?.pu_base_unit_label
        ? ''
        : activeVariant?.pu_b2c_sales_unit_label;
    const baseUnitLabel = isB2bUser
        ? activeVariant?.pu_base_unit_label
        : activeVariant?.pu_base_unit_label;
    const baseUnitMultipalier = isB2bUser
        ? activeVariant?.pu_b2b_base_unit_multiplier
        : activeVariant?.pu_b2c_base_unit_multiplier;

    const unitId = isB2bUser
        ? activeVariant?.pu_b2b_sales_unit_id
        : activeVariant?.pu_b2c_sales_unit_id;

    return {
        minQty,
        maxQty,
        salesUnitLabel,
        baseUnitLabel,
        baseUnitMultipalier,
        unitId,
    };
};

export const getDefaultImage = type => {
    if (type === 'medicine') {
        return defaultmedicine;
    } else if (type === 'healthcare') {
        return defaulthealthcare;
    } else if (type === 'beauty') {
        return defaultbeauty;
    } else if (type === 'pet_&_vet') {
        return defaultpet;
    } else if (type === 'food') {
        return defaultfood;
    } else if (type === 'uncategorized') {
        return defaultmedicine;
    } else {
        return defaultmedicine;
    }
};

export const capitalize = word => {
    return word[0].toUpperCase() + word.slice(1);
};

export function padWithZero(number) {
    return number < 10 ? '0' + number : number;
}

export function getTimeDifference(start, end) {
    // Convert time strings to Date objects
    const startTime = new Date(start);
    const endTime = new Date(end);

    // Calculate the difference in milliseconds
    const timeDiff = Math.abs(endTime - startTime);

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return {
        hours: padWithZero(hours),
        minutes: padWithZero(minutes),
    };
}

export function checkProductOutOfStock(
    productAllowSale,
    productVariantAllowSale,
) {
    return productAllowSale === 0
        ? true
        : productVariantAllowSale === 0
        ? true
        : false;
}
export const debounceFn = (func, delay) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

export const generateQtyList = (variant, qty = {}) => {
    if (!variant) {
        return [];
    }

    const {
        pv_b2b_min_qty,
        pv_b2c_min_qty,
        pv_b2b_max_qty,
        pv_b2c_max_qty,
        pu_multiplier,
        pu_unit_label,
        pu_b2b_base_unit_multiplier,
        pu_b2c_base_unit_multiplier,
        pu_b2b_sales_unit_label,
        pu_b2c_sales_unit_label,
        pu_base_unit_label,
    } = variant;

    // const minQty = b2bUser()
    // ? pv_b2b_min_qty
    // : pv_b2c_min_qty;
    // const maxQty = b2bUser() ? pv_b2b_max_qty : pv_b2c_max_qty;
    let minQty = 0;
    let maxQty = 0;
    if (b2bUser()) {
        if (!_.isEmpty(qty)) {
            minQty = qty?.b2b_min_qty;
            maxQty = qty?.b2b_max_qty;
        } else {
            minQty = pv_b2b_min_qty;
            maxQty = pv_b2b_max_qty;
        }
    } else {
        if (!_.isEmpty(qty)) {
            minQty = qty?.b2c_min_qty;
            maxQty = qty?.b2c_max_qty;
        } else {
            minQty = pv_b2c_min_qty;
            maxQty = pv_b2c_max_qty;
        }
    }
    minQty = minQty ? minQty : 1; //if minQty is 0 then set it to 1
    maxQty = maxQty ? maxQty : 1; //if maxQty is 0 then set it to 1

    let baseUnitMultiplier = b2bUser()
        ? pu_b2b_base_unit_multiplier
        : pu_b2c_base_unit_multiplier;
    let defaultSalesUnitLabel = b2bUser()
        ? pu_b2b_sales_unit_label
        : pu_b2c_sales_unit_label;

    if (!baseUnitMultiplier) {
        baseUnitMultiplier = pu_multiplier;
    }

    if (!defaultSalesUnitLabel) {
        defaultSalesUnitLabel = pu_unit_label;
    }

    return Array.from({length: maxQty - minQty + 1}, (_, i) => {
        const quantity = minQty + i;
        const isSameUnit = pu_base_unit_label === defaultSalesUnitLabel;
        const labels = ['tablet', 'capsule', 'injection'];
        const x = labels?.includes(pu_base_unit_label?.toLocaleLowerCase())
            ? ' '
            : ' x ';
        const renderLabel = () => {
            if (defaultSalesUnitLabel && baseUnitMultiplier) {
                if (isSameUnit) {
                    if (defaultSalesUnitLabel === "1's Pack") {
                        return `${quantity}${x}${defaultSalesUnitLabel}`;
                    }
                    if (
                        labels?.includes(
                            pu_base_unit_label?.toLocaleLowerCase(),
                        )
                    ) {
                        return `${quantity}${x}${pluralize(
                            defaultSalesUnitLabel,
                            quantity,
                        )}`;
                    } else {
                        return `${quantity}${x}${defaultSalesUnitLabel}`;
                    }
                }

                return `${quantity * baseUnitMultiplier}${x}${pluralize(
                    pu_base_unit_label,
                    quantity * baseUnitMultiplier,
                )} (${quantity} ${pluralize(defaultSalesUnitLabel, quantity)})`;
            } else {
                return quantity;
            }
        };

        return {
            label: renderLabel(),
            value: quantity,
        };
    });
};

export const generateSingleQtyList = (variant, crrQty) => {
    if (!variant) {
        return [];
    }

    const {
        pu_multiplier,
        pu_unit_label,
        pu_b2b_base_unit_multiplier,
        pu_b2c_base_unit_multiplier,
        pu_b2b_sales_unit_label,
        pu_b2c_sales_unit_label,
        pu_base_unit_label,
    } = variant;

    let baseUnitMultiplier = b2bUser()
        ? pu_b2b_base_unit_multiplier
        : pu_b2c_base_unit_multiplier;
    let defaultSalesUnitLabel = b2bUser()
        ? pu_b2b_sales_unit_label
        : pu_b2c_sales_unit_label;

    if (!baseUnitMultiplier) {
        baseUnitMultiplier = pu_multiplier;
    }

    if (!defaultSalesUnitLabel) {
        defaultSalesUnitLabel = pu_unit_label;
    }

    const quantity = crrQty ? crrQty * 1 : 1;
    const isSameUnit = pu_base_unit_label === defaultSalesUnitLabel;
    const labels = ['tablet', 'capsule', 'injection'];
    const x = labels?.includes(pu_base_unit_label?.toLocaleLowerCase())
        ? ' '
        : ' x ';

    const renderLabel = () => {
        if (defaultSalesUnitLabel && baseUnitMultiplier) {
            if (isSameUnit) {
                if (defaultSalesUnitLabel === "1's Pack") {
                    return `${quantity}${x}${defaultSalesUnitLabel}`;
                }
                if (labels?.includes(pu_base_unit_label?.toLocaleLowerCase())) {
                    return `${quantity}${x}${pluralize(
                        defaultSalesUnitLabel,
                        quantity,
                    )}`;
                } else {
                    return `${quantity}${x}${defaultSalesUnitLabel}`;
                }
            }
            return `${quantity * baseUnitMultiplier}${x}${pluralize(
                pu_base_unit_label,
                quantity * baseUnitMultiplier,
            )} (${quantity} ${pluralize(defaultSalesUnitLabel, quantity)})`;
        } else {
            return quantity;
        }
    };
    return renderLabel();
};

export const generateRouteLink = urlPath => {
    if (!urlPath) return;
    const pathParts = urlPath.split('/');
    const accountKey = pathParts[1];
    const routeKey = pathParts[2];

    switch (accountKey) {
        case 'account':
            switch (routeKey) {
                case 'orders':
                    return 'Orders';
                case 'notification':
                    return 'Notifications';
                case 'prescriptions':
                    return 'MyPrescription';
                case 'notified-products':
                    return 'RequestedProducts';
                case 'suggest-products':
                    return 'SuggestMedicine';
                case 'wishlist':
                    return 'Wishlist';
                case 'address':
                    return 'Addresses';
                case 'offers':
                    return 'SpecialOffers';
                case 'referral':
                    return 'Refer';
                default:
                    return 'HomeBlock';
            }
        default:
            return 'HomeBlock';
    }
};
export const safeReadAsyncStorage = async key => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data != null ? JSON.parse(data) : null; // Parse only if data is not null
    } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
        return null;
    }
};

export const safeWriteAsyncStorage = async (key, value) => {
    try {
        const data = JSON.stringify(value);
        await AsyncStorage.setItem(key, data);
    } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
    }
};

export const getSelectedVendorLabPrice = (
    labVendorItems,
    forcedVendor = null,
) => {
    /**
     * get cartData => for logged in
     */
    const {cartData} = useSelector(state => state.labTest);

    const result = {
        isUnavailable: false,
        hintMessage: '',
        vendor: null,
        regularPrice: '',
        discountPrice: '',
        discountPercent: '',
        hasDiscount: false,
    };

    let defaultPrice = null;
    let finalPrice = null;
    let inputVendor = null;

    if (forcedVendor !== null) {
        inputVendor = forcedVendor;
    } else {
        const found = labVendorItems?.find(
            item => item.vendor.id === cartData?.vendor?.id,
        );

        if (found) {
            inputVendor = found.vendor;
        }
    }

    // for lab vendor update playstore
    if (_.isEmpty(labVendorItems)) {
        return {
            isUnavailable: false,
            hintMessage: '',
            regularPrice: '',
            discountPrice: '',
            discountPercent: '',
            hasDiscount: true,
        };
    }

    for (const price of labVendorItems) {
        if (
            (inputVendor?.id || inputVendor?.tag) &&
            (price.vendor.id === inputVendor.id ||
                price.vendor.tag === inputVendor.tag) &&
            price.status === 'active'
        ) {
            finalPrice = price;
            break;
        } else if (price.vendor.isDefault) {
            defaultPrice = price;
        }
    }

    if (inputVendor) {
        if (!finalPrice) {
            result.vendor = inputVendor;
            result.isUnavailable = true;
            result.hintMessage = `Offered by other lab partners`;
            return result;
        }
    } else {
        finalPrice = defaultPrice;
    }

    if (!finalPrice) {
        result.vendor = null;
        result.isUnavailable = true;
        result.hintMessage = `Not offered`;
        return result;
    }

    result.vendor = finalPrice.vendor;

    const regularPrice = parseFloat(finalPrice.regularPrice);
    const discountPrice = parseFloat(finalPrice.discountPrice);
    const discountPercent = parseFloat(finalPrice.discountPercent);

    if (isNaN(regularPrice) || isNaN(discountPrice) || isNaN(discountPercent)) {
        result.isUnavailable = true;
        result.hintMessage = `Not offered by ${result.vendor.name}`;
    } else if (discountPrice > 0 && discountPrice < regularPrice) {
        result.regularPrice = regularPrice.toFixed(0);
        result.discountPrice = discountPrice.toFixed(0);
        result.discountPercent = discountPercent.toFixed(0);
        result.hasDiscount = true;
    } else {
        result.regularPrice = regularPrice.toFixed(0);
        result.discountPrice = discountPrice.toFixed(0);
        result.discountPercent = discountPercent.toFixed(0);
        result.hasDiscount = false;
    }

    return result;
};

export const queryHashmap = {
    popularAsc: '&popularity=desc',
    priceAsc: '&price=asc',
    priceDesc: '&price=desc',
    discountDesc: '&discount=desc',
    discountAsc: '&discount=asc',
    alphabetAsc: '&alphabet=asc',
    under500: '&priceThreshold=0,500',
    under1000: '&priceThreshold=0,1000',
    under2000: '&priceThreshold=0,2000',
    under3000: '&priceThreshold=0,3000',
    over3000: '&priceThreshold=3000,300000',
};

export const sortLabelHashmap = {
    popularAsc: 'Popularity',
    priceAsc: 'Price: low to high',
    priceDesc: 'Price: high to low',
    discountDesc: 'Discount: high to low',
    discountAsc: 'Discount: low to high',
    alphabetAsc: 'Name (A to Z)',
};

export const filterPriceLabelHashmap = {
    under500: 'Under ৳500',
    under1000: 'Under ৳1000',
    under2000: 'Under ৳2000',
    under3000: 'Under ৳3000',
    over3000: 'Above ৳3000',
};

export const generateNavigationTarget = value => {
    if (value == 'products') {
        return 'ProductListing';
    } else if (value == 'category') {
        return 'CategoryListing';
    } else if (value == 'brand') {
        return 'BrandList';
    } else {
        return 'ProductListing';
    }
};
