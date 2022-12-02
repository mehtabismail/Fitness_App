import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import {Dashboard, Login, Splash} from '../screens';
// import BottomTabs from './TabNavigation';
import DrawerNavigation from './DrawerNavigation';
import Signup from '../screens/auth/Signup';
import BottomTabs from './TabNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={navigationStrings.SPLASH}>
        {/* SPLASH SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.SPLASH}
          component={Splash}
          options={{headerShown: false}}
        />

        {/* LOGIN SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.LOGIN}
          component={Login}
          options={{headerShown: false}}
        />

        {/* SIGNUP SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.SIGNUP}
          component={Signup}
          options={{headerShown: false}}
        />

        {/* Profile SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.DASHBOARD}
          component={Dashboard}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={navigationStrings.DRAWER}
          component={DrawerNavigation}
          options={{headerShown: false}}
        />

        {/* BOTTOM-TABS SCREEN STACK */}
        <Stack.Screen
          name={navigationStrings.BOTTOM_TABS}
          component={BottomTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
