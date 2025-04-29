
import * as React from 'react';

export function calculatePercentage(d_price, price) {
    return !!parseFloat(price) && !!parseFloat(d_price)
        ? (100 - (d_price / price) * 100).toFixed(0)
        : 0;
}

export function validPhoneNumber(phone) {
    const regex = /(^(\+8801|8801|008801|01))(\d){9}$/;
    return regex.test(phone);
}

export function validEmail(email) {
    const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

export function getQtyLabel(i, medicine) {
    if (!medicine) {
        return '';
    }
    if (medicine.form == medicine.unit) {
        const s = i === 1 ? '' : 's';
        return `${i} ${medicine.unit}${s}`;
    }
    const match = medicine.unit.match(/([0-9]+){1,3}/);
    const qty = match ? match[0] : 0;

    if (qty && `${qty} ${medicine.form}s` == medicine.unit) {
        return `${i * qty} ${medicine.form}s`;
    }

    return `${i} * ${medicine.unit}`;
}

export function getVariantQuantityLevel(qty, item) {
    if (!item) {
        return '';
    }

    if (qty && `${qty} ${item.form}s` == item.unit) {
        return `${i * qty} ${item.form}s`;
    }

    return `${i} * ${item.unit}`;
}

export function fontSize(size) {
    const {Dimensions} = require('react-native');
    const {width} = Dimensions.get('window');
    if (width < 350) {
        return size - 2;
    } else {
        return size;
    }
}

let navigator;
export function updateNavigator(nav) {
    if (nav) {
        navigator = nav;
    }
    return navigator;
}

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef?.current?.navigate(name, params);
}

export const convertToKFormat = (count) => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`;
    }
    return count?.toString();
};