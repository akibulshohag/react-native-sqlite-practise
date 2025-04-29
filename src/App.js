/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import FastImage from 'react-native-fast-image';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, BackHandler, Linking, Alert } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor } from './redux';
import BackgroundColor from 'react-native-background-color';
import { navigationRef } from './api/common';
import { config , selectServer } from '../config';
import colors from './constants/colors';
import { NavigationContainer } from '@react-navigation/native';
import linking from './Linking';
// import Login from './components/common/bottomsheet/login/Login';
import BottomNavigation from './navigation/BottomTabNavigation';
import { version } from '../package.json';
import _ from 'lodash';
// import { DateTime } from 'luxon';
import {handleOpenUrl} from './utils/handleUrlLinking';

function AppContent({ baseUrl, setBaseUrl }) {
  const dispatch = useDispatch();
  const [redirectState, setRedirectState] = useState('');
  const routeNameRef = useRef();
  const loginBottomSheetRef = useRef();
  const { user, b2bData, globalData } = useSelector(state => state.app);
  const autoReferCode = useSelector(state => state.app.autoReferCode);


  useEffect(() => {
    if (Platform.OS === 'android') {
      BackgroundColor.setColor(colors.white);
    }
  }, []);

  
  // notifications
  

  // when app is already open
  useEffect(() => {
    const listener = Linking.addEventListener('url', event => {
      Linking.canOpenURL(event.url)
        ?.then(supported => {
          if (supported) {
            handleOpenUrl(
              event.url,
              loginBottomSheetRef,
              setRedirectState,
            );
          }
        })
        .catch(error => console.log(error));
    });

    return () => {
      listener.remove();
    };
  }, []);

  // when app is not open
  useEffect(() => {
    Linking.getInitialURL()
      ?.then(url => {
        if (url) {
          Linking.canOpenURL(url)?.then(supported => {
            if (supported) {
              handleOpenUrl(
                url,
                loginBottomSheetRef,
                setRedirectState,
              );
            }
          });
        }
      })
      .catch(error => console.log(error));
  }, []);


  const backAction = () => {
    const currentRouteName =
      navigationRef?.current?.getCurrentRoute()?.name;
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
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      } else {
        navigationRef?.current?.reset({
          index: 0,
          routes: [{ name: 'HomeBlock' }],
        });
        return true;
      }
    }
  };
  useEffect(() => {
    BackHandler?.addEventListener('hardwareBackPress', backAction);
  }, []);
  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current =
          navigationRef?.current?.getCurrentRoute()?.name;
        // handleInitialNotification();
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef?.current;
        const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;
        // if (previousRouteName !== currentRouteName) {
        //   await logEvent('screen_view', {
        //     screen_name: currentRouteName,
        //     screen_class: currentRouteName,
        //   });
        // }
        // routeNameRef.current = currentRouteName;
      }}>
        <BottomNavigation />
      {/* <Login
        ref={loginBottomSheetRef}
        setRedirectState={setRedirectState}
        redirectState={redirectState}
      /> */}
    </NavigationContainer>
  );
}

export default function AppWrapper() {
  const [baseUrl, setBaseUrl] = useState(null);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContent baseUrl={baseUrl} setBaseUrl={setBaseUrl} />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
