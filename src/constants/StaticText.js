import {
    prescriptionImgOne,
    prescriptionImgTwo,
    prescriptionImgThree,
    prescriptionImgFour,
    prescriptionImgFive,
} from '../img/getImage';

export const rxData = [
    {title: 'Required', value: 1},
    {title: 'Not Required', value: 0},
];

export const filterData = [
    {
        title: 'Price',
    },
    {
        title: 'Discount range',
    },
    {
        title: 'Brands',
    },
    {
        title: 'Product Tags',
    },
    {
        title: 'Product Form',
    },
    // {
    //     title: 'RX Required',
    // },  
];

export const filterDataWithCategory = [
    {
        title: 'Price',
    },
    {
        title: 'Discount range',
    },
    {
        title: 'Category',
    },
    {
        title: 'Brands',
    },
    {
        title: 'Product Tags',
    },
    {
        title: 'Product Form',
    },
    // {
    //     title: 'RX Required',
    // },  
];

export const sortData = [
    {
        id: 1001,
        title: 'Popularity',
        value: 'pv_allow_sales:desc, productCountOrdered:desc',
    },
    {
        id: 1002,
        title: 'Price: low to high',
        value: 'pv_b2c_price:asc',
    },
    {
        id: 1003,
        title: 'Price: high to low',
        value: 'pv_b2c_price:desc',
    },
    {
        id: 1004,
        title: 'Discount',
        value: 'pv_b2c_discount_percent:desc',
    },
    {
        id: 1005,
        title: 'Name (A to Z)',
        value: 'p_name:asc',
    },
];

export const validPrescriptionGuideArray = [
    {
        image: prescriptionImgOne,
        title: 'What is a valid prescription?',
        subTitle:
            'A valid prescription should contain doctor, patient, medicine details & the doctor’s signature.',
    },
    {
        image: prescriptionImgTwo,
        title: 'Doctor’s name & details',
        subTitle:
            'Doctor’s name, the practising hospital, registered number should be present on the prescription',
    },
    {
        image: prescriptionImgThree,
        title: 'What is a valid prescription?',
        subTitle:
            'A valid prescription should contain doctor, patient, medicine details & the doctor’s signature.',
    },
    {
        image: prescriptionImgFour,
        title: 'Medicine’s name & dosage',
        subTitle:
            'such as medicine name, strength, duration should be mentioned on the prescription.',
    },
    {
        image: prescriptionImgFive,
        title: 'Doctor’s signature & stamp',
        subTitle:
            'Signature &/or stamp of the doctor is necessary for the prescription to be valid',
    },
];
