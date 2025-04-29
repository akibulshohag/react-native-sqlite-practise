import querystring from 'qs';
import {StackActions} from '@react-navigation/native';
import {navigationRef} from '../api';
import _ from 'lodash';
import {store} from '../redux';
import {generateRouteLink} from './Utilities';
export const handleOpenUrl = (url, loginBottomSheet, setRedirectState) => {
    const {app} = store.getState();

    if (!!url) {
        const urlParams = querystring.parse(url.split('?')[1]);
        if (urlParams.target_url) {
            url = decodeURIComponent(urlParams.target_url);
        }
        const urlPath = url.replace(/^.+arogga.com/, '');

        // const urlPath = url.replace(
        //     /^https?:\/\/(?:www\.|m\.)?arogga\.com\//,
        //     '',
        // );
        if (urlPath.indexOf('/product/') === 0) {
            const key = urlPath.split('/product/').pop();
            const id = key.split('/')[0].split('?')[0];
            if (!!id) {
                navigationRef?.current?.navigate('ProductDetails', {
                    id: id,
                    ...(urlParams?.pv_id && {pv_id: urlParams.pv_id}),
                    // pv_id: urlParams?.pv_id || id,
                });
            }
        } else if (urlPath.indexOf('/products') === 0) {
            navigationRef?.current?.navigate('ProductListing', {
                link: {
                    ...urlParams,
                    _block: urlParams?.source,
                    ...(urlParams?.call && {call: urlParams?.call}),
                },
            });
        } else if (urlPath.includes('/brand/')) {
            const key = urlPath.split('/brand').pop();
            if (key.indexOf('/') === 0 && _.size(key) > 1) {
                const newkey = key.substring(1);
                const splitedKey = newkey.split('/');
                navigationRef?.current?.navigate('SingleBrand', {
                    id: splitedKey[0],
                });
            } else {
                navigationRef?.current?.navigate('SingleBrand');
            }
        } else if (urlPath.indexOf('/brand') === 0) {
            navigationRef?.current?.navigate('BrandList');
        } else if (urlPath.includes('/category/')) {
            const key = urlPath.split('/category').pop();
            const sid = urlParams?.sid;
            const mid = urlParams?.mid;
            if (_.size(key) > 1) {
                const newkey = key.substring(1);
                const splitedKey = newkey.split('/');
                navigationRef?.current?.dispatch(
                    StackActions.push('CategoryListing', {
                        tax_category: splitedKey[0],
                        ...(splitedKey[1] && {cat_id: splitedKey[1]}),
                        ...(mid && {mid: mid}),
                        ...(sid && {sid: sid}),
                    }),
                );
            } else {
                navigationRef?.current?.navigate('CategoryListing', {
                    tax_category: splitedKey[0],
                });
            }
        } else if (urlPath.indexOf('/orders/') === 0) {
            if (!!app?.user) {
                navigationRef?.current?.navigate('Orders');
            } else {
                navigationRef?.current?.navigate('Login');
            }
        } else if (urlPath.indexOf('/order/') === 0) {
            if (app?.user) {
                const key = urlPath.split('/order/').pop();
                const id = key.split('/').shift();
                if (!!id) {
                    navigationRef?.current?.navigate('SingleOrder', {
                        po_id: id,
                    });
                } else {
                    navigationRef?.current?.navigate('Orders');
                }
            } else {
                navigationRef?.current?.navigate('Login');
            }
        } else if (urlPath.indexOf('/s/') === 0) {
            if (!autoReferCode) {
                const key = urlPath.split('/s/').pop();
                const referCode = key.split('/').shift();
                if (!!referCode) {
                    dispatch(appSetAutoReferCode(referCode));
                }
            }
        } else if (urlPath.indexOf('/search') === 0) {
            console.log('searchUrlPath', urlPath);
            const key = urlPath.split('/search?').pop();
            if (!urlPath.includes('?')) {
                navigationRef?.current?.navigate('Search');
            } else {
                const params = querystring.parse(key);
                navigationRef?.current?.navigate('Search', params);
            }
        } else if (urlPath.indexOf('/healthcare') === 0) {
            navigationRef?.current?.navigate('Healthcare');
        } else if (urlPath.indexOf('/beauty') === 0) {
            navigationRef?.current?.navigate('Beauty');
        } else if (urlPath.indexOf('/pharmacy-register') === 0) {
            if (!!app?.user) {
                navigationRef?.current?.navigate('PharmacyRegistration');
            } else {
                navigationRef?.current?.navigate('Login');
            }
        } else if (urlPath.indexOf('/account/') === 0) {
            const routeLink = generateRouteLink(urlPath);
            if (!!app?.user) {
                navigationRef?.current?.navigate(routeLink);
            } else {
                loginBottomSheet?.current?.open();
                setRedirectState(routeLink);
            }
        } else if (urlPath.indexOf('/blog') === 0) {
            const pathParts = urlPath.split('/');
            const blogType = pathParts[2];

            if (blogType) {
                if (blogType === 'general') {
                    const id = pathParts[3];
                    if (id) {
                        navigationRef?.current?.dispatch(
                            StackActions.push('SingleBlog', {
                                bp_id: id,
                            }),
                        );
                    } else {
                        navigationRef?.current?.dispatch(
                            StackActions.push('Blogs'),
                        );
                    }
                } else {
                    navigationRef?.current?.dispatch(
                        StackActions.push('Blogs', {
                            blogType,
                        }),
                    );
                }
            } else {
                navigationRef?.current?.dispatch(StackActions.push('Blogs'));
            }
        } else if (urlPath.indexOf('/lab-test') === 0) {
            const isLabDetailsRoute = urlPath.includes('tests');

            if (isLabDetailsRoute) {
                const labItemSlug = urlPath.split('/tests/').pop();

                navigationRef?.current?.navigate('LabTest', {
                    screen: 'LabTestPackageDetail',
                    params: {
                        initialData: {
                            slug: labItemSlug,
                        },
                    },
                });
            } else {
                navigationRef?.current?.navigate('LabTest');
            }
        } else {
            navigationRef?.current?.navigate('HomeBlock');
        }
    } else {
        navigationRef?.current?.navigate('HomeBlock');
    }
};
