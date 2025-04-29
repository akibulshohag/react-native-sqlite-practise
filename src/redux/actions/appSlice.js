import {createSlice} from '@reduxjs/toolkit';
import {TEL_NUMBER} from '../../../config';
import _ from 'lodash';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        user: null,
        fcmToken: null,
        homeBlockData: {},
        homeData: {},
        autoReferCode: '',
        language: 'en',
    },
    reducers: {
        appSetUser: (state, action) => {
            if (!action.payload) {
                state.user = null;
                state.fcmToken = null;
                state.notifications = [];
            } else {
                state.user = {...state.user, ...action.payload};
            }
        },
        appSetFcmToken: (state, action) => {
            state.fcmToken = action.payload;
        },
        appSetHomeBlockData: (state, action) => {
            state.homeBlockData = action.payload;
        },
        appSetHomeBlockDataMore: (state, action) => {
            state.homeBlockData.data.push(...action.payload.data);
        },
        appSetAutoReferCode: (state, action) => {
            state.autoReferCode = action.payload || '';
        },
        appSetLanguage: (state, action) => {
            state.language = action.payload || 'en';
        },

    },
});

export const {
    appSetUser,
    appSetFcmToken,
    appSetHomeBlockData,
    appSetHomeBlockDataMore,
    appSetAutoReferCode,
    appSetLanguage,
} = appSlice.actions;

export default appSlice.reducer;
