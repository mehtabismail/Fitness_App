/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import navigationStrings from '../constants/navigationStrings';
import {Dashboard, Profile} from '../screens';
import CustomDrawer from './CustomDrawer';
import DashboardSVG from '../assets/SVG/dashboard.svg';
import ProfileSVG from '../assets/SVG/profile.svg';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: {marginLeft: -20},
        drawerStyle: {
          // height: 700,
          borderBottomRightRadius: 10,
        },
      }}
      initialRouteName={navigationStrings.DASHBOARD}>
      <Drawer.Screen
        name={navigationStrings.DASHBOARD}
        component={Dashboard}
        options={{
          drawerIcon: props =>
            props?.focused === true ? <DashboardSVG /> : <DashboardSVG />,
        }}
      />
      <Drawer.Screen
        name={navigationStrings.PROFILE}
        component={Profile}
        options={{
          drawerIcon: props =>
            props?.focused === true ? <ProfileSVG /> : <DashboardSVG />,
        }}
      />
    </Drawer.Navigator>
  );
}
