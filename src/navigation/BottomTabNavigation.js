import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigation from './StackNavigation';
import { StackActions } from '@react-navigation/native';
import colors from '../constants/colors';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    View,
    Animated,
} from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BottomTabLessScreens } from '../constants/BottomLessScreens';
import {
    beauty,
    healthCare,
    healthCareFill,
    homeMenu,
    homeMenuFill,
    labTest,
    moreMenu,
    labTestFill,
    beautyFill,
    moreMenuFill,
} from '../img/getImage';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const BottomNavigation = () => {
    const Tab = createBottomTabNavigator();
    const { user } = useSelector(state => state.app);
    const pressableEvent = ({ children, ...rest }) => {
        return (
            <Pressable
                {...rest}
                style={[rest.style, { overflow: 'hidden'}]}
                android_ripple={{
                    color: 'rgba(58, 172, 159, 0.7)',
                    borderless: false,
                    radius: 50,
                }}>
                {children}
            </Pressable>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use 'height' on Android
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} // Adjust the offset as needed
            >
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                    }}
                    
                    >
                    <Tab.Screen
                        name="Home"
                        component={StackNavigation}
                        listeners={({ navigation, route }) => ({
                            blur: () => {
                                if (route?.state && route?.state?.index !== 0) {
                                    const popAction = StackActions.popToTop();
                                    navigation.dispatch(popAction);
                                }
                            },
                        })}
                        options={({ route }) => ({
                            tabBarLabel: 'Home',
                            tabBarActiveTintColor: colors.primaryColor,
                            tabBarInactiveTintColor: colors.smallText,
                            tabBarLabelStyle: styles.tabBarLabelStyle,
                            tabBarAllowFontScaling: true,
                            tabBarStyle: {
                                height: Platform.OS === 'ios' ? 90 : 60,
                                ...(route => {
                                    const routeName =
                                        getFocusedRouteNameFromRoute(route) ?? '';
                                    if (BottomTabLessScreens.includes(routeName)) {
                                        return { display: 'none' };
                                    }
                                    return {};
                                })(route),
                            },
                            tabBarIcon: ({ focused }) => {
                                return (
                                    <View style={[styles.tabBarSingleView]}>
                                        {focused && (
                                            <View
                                                style={{
                                                    height: 2,
                                                    width: 65,
                                                    backgroundColor:
                                                        colors.primaryColor,
                                                    top: -14,
                                                }}
                                            />
                                        )}
                                        <Image
                                            source={
                                                focused ? homeMenuFill : homeMenu
                                            }
                                            style={[
                                                styles.tabBarIconStyles,
                                                {
                                                    tintColor: focused
                                                        ? colors.primaryColor
                                                        : colors.smallText,
                                                },
                                            ]}
                                        />
                                    </View>
                                );
                            },
                            tabBarButton: pressableEvent,
                        })}
                    /> 
                </Tab.Navigator>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'inter-regular' : 'Inter-Regular',
        fontWeight: '500',
        lineHeight: 16.8,
        marginVertical: 2,
    },
    tabBarSingleView: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    tabBarIconStyles: {
        width: 28,
        height: 28,
    },
});

export default BottomNavigation;
