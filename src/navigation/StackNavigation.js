import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeBlock from '../screens/HomeBlock';

const HomeStack = createStackNavigator();

const StackNavigation = () => {
    return (
        <HomeStack.Navigator options={{headerShown: false}}>
            <HomeStack.Screen
                name="HomeBlock"
                component={HomeBlock}
                options={{headerShown: false}}
            />
           
        </HomeStack.Navigator>
    );
};

export default StackNavigation;
