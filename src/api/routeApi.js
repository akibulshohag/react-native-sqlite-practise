import querystring from 'qs';
import {config, selectServer} from '../../config';
import {Platform} from 'react-native';
import {version} from '../../package.json';
import {store, getDispatch} from '../redux';
import {appSetUser} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getUrl(endpoint, baseUrl) {
    const extra = querystring.stringify({
        f: 'app',
        v: version,
        os: Platform.OS,
        osv: Platform.Version,
    });

    let url = `${baseUrl}/${endpoint}`;

    if (url.indexOf('?') === -1) {
        url += '?' + extra;
    } else {
        url += '&' + extra;
    }
    return url;
}

const handleResponse = async (
    response,
    endpoint,
    method,
    body,
    headers,
    baseUrl,
) => {
    const {app} = store.getState();
    const dispatch = getDispatch();
    if (response.status === 401) {
        if (!!app?.user?.authToken) {
            return (
                fetch(`${baseUrl}/auth/v1/token/refresh/`, {
                    method: 'POST',
                })
                    // ?.then(response => response.text())
                    // ?.then(response => {
                    //     console.log('response 2 ', response);
                    //     // return response
                    //     return JSON.parse(response);
                    // })
                    ?.then(res => res.json())
                    ?.then(res => {
                        if (res.status === 'success') {
                            dispatch(
                                appSetUser({
                                    authToken: res?.data?.authToken,
                                }),
                            );
                            return res;
                        } else {
                            dispatch(appSetUser(null));
                            throw new Error('API TOKEN REFRESH ERROR');
                        }
                    })
                    ?.then(() => {
                        return request({endpoint, method, body, headers});
                    })
                    .catch(error => {
                        console.log(error);
                        throw error;
                    })
            );
        }
    }
    return response.json();
};

export async function request({
    endpoint,
    method = 'GET',
    body,
    headers = {},
    forceJson = false,
}) {
    const {app} = store.getState();
    let accessToken = app?.user?.authToken;
    const authHeaders = {};
    if (!!accessToken) {
        authHeaders['Authorization'] = `Bearer ${accessToken}`;
    }
    const BASE_URL = await AsyncStorage.getItem('BASE_URL');

    let baseUrl;

    if (selectServer === 'staging') {
        baseUrl = BASE_URL || config.apiBaseUrl;
    } else {
        baseUrl = config.apiBaseUrl;
    }

    return fetch(getUrl(endpoint, baseUrl), {
        method,
        headers: {
            ...(body
                ? {
                      'Content-Type': !forceJson
                          ? 'application/x-www-form-urlencoded'
                          : 'application/json',
                  }
                : {}),

            ...headers,
            ...authHeaders,
        },
        ...(body
            ? {
                  body:
                      body instanceof FormData
                          ? body
                          : !forceJson
                          ? querystring.stringify(body)
                          : JSON.stringify(body),
              }
            : {}),
    })
        ?.then(response =>
            handleResponse(response, endpoint, method, body, headers, baseUrl),
        )
        .catch(error => {
            console.log('api request error', 'endpoint', endpoint, error);
            throw error;
        });

    // ?.then(response => response.text())
    // ?.then(response => {
    //     console.log('response 2 ', response);
    //     // return response
    //     return JSON.parse(response);
    // })
}


export function getSingleFaq(slug) {
    return request({
        endpoint: `v1/faqs/${slug}/`,
        method: 'GET',
    });
}


export function getLocationData(obj) {
    return request({
        endpoint: `v1/locationData/?${querystring.stringify(obj)}`,
        method: 'GET',
    });
}
export function userProfileDataUpdate(body) {
    const formData = new FormData();
    Object.keys(body).forEach(key => {
        const value = body[key];
        if (!value) {
            return;
        }
        formData.append(key, value);
    });
    return request({
        endpoint: 'v1/profile',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    }).catch(error => console.error(error));
}
export function proceedToCheckout(body) {
    return request({
        endpoint: 'general/v1/proceedToCheckout',
        method: 'POST',
        body,
    });
}
