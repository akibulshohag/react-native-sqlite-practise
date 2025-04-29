import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from './actions/appSlice';

const rootReducer = combineReducers({
    app: appReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false, immutableCheck: false}),
});
export const persistor = persistStore(store);

export const getDispatch = () => {
    return store.dispatch;
};