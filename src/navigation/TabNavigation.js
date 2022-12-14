/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, Platform, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../theme/Colors';
import navigationStrings from '../constants/navigationStrings';
import {Dashboard, Exercise, Profile} from '../screens';
import metrics from '../theme/Metrics';
import DashboardSVG from '../assets/SVG/dashboard.svg';
import ProfileSVG from '../assets/SVG/profile.svg';
import Dumbell from '../assets/SVG/dumbell.svg';
// import metrics from '../theme/Metrics';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      // initialRouteName={navigationStrings.WALLET}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 48,
          right: 48,
          alignSelf: 'center',
          elevation: 0,
          backgroundColor: Colors.bottomTabBackground,
          height: 70,
          borderRadius: 15,
        },
      }}>
      {/* DASHBOARD SCREEN */}
      <Tab.Screen
        name={navigationStrings.DASHBOARD}
        component={Dashboard}
        options={{
          title: navigationStrings.DASHBOARD,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarStyle}>
                <View>
                  <DashboardSVG
                    height={30}
                    width={30}
                    fill={focused ? Colors.Primary : Colors.Secondary}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: focused ? Colors.Primary : Colors.Secondary,
                      fontFamily: 'RedHatDisplay-Medium',
                      fontSize: 14,
                    }}>
                    Dashboard
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />

      {/* GYM-EXERCIZE SCREEN STACK */}
      <Tab.Screen
        name={navigationStrings.EXERCISE}
        component={Exercise}
        options={{
          title: navigationStrings.EXERCISE,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarStyle}>
                <View>
                  <Dumbell
                    height={30}
                    width={30}
                    fill={focused ? Colors.Primary : Colors.Secondary}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: focused ? Colors.Primary : Colors.Secondary,
                      fontFamily: 'RedHatDisplay-Medium',
                      fontSize: 14,
                    }}>
                    Exercize
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />

      {/* PROFILE SCREEN STACK */}
      <Tab.Screen
        name={navigationStrings.PROFILE}
        component={Profile}
        options={{
          title: navigationStrings.PROFILE,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarStyle}>
                <View>
                  <ProfileSVG
                    height={30}
                    width={30}
                    fill={focused ? Colors.Primary : Colors.Secondary}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: focused ? Colors.Primary : Colors.Secondary,
                      fontFamily: 'RedHatDisplay-Medium',
                      fontSize: 14,
                    }}>
                    Profile
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    marginTop: Platform.OS === 'ios' ? metrics.doubleBaseMargin : null,
    alignItems: 'center',
  },
});
