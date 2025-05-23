import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import deviceInfoModule from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import { Platform } from 'react-native';
import { screens } from '../utils';
import { dimensions, color, fontWeights, fontSizes } from '../styles';

//-- Import screens
import HomeScreen from '../layouts/home';
import AccountScreen from '../layouts/setting/accounts';
import { StoreContext } from '../store';
import DemoScreen from '../layouts/demo/demo';

const Tab = createBottomTabNavigator();
const isTable = deviceInfoModule.isTablet();
const hasNotch = deviceInfoModule.hasNotch();
const IOS = Platform.OS === 'ios' ? true : false;

export default function TabNavigator() {
  const { t } = useTranslation();
  const { colors } = useContext(StoreContext);
  return (
    <Tab.Navigator
      initialRouteName={screens.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          // borderTopWidth: 0,
          height: isTable
            ? dimensions.moderate(55)
            : IOS
              ? dimensions.moderate(75)
              : dimensions.moderate(55),
          backgroundColor: colors.BG__PRIMARY
        },
        tabBarActiveTintColor: colors.BUTTON__WHITE,
        tabBarInactiveTintColor: colors.BUTTON__PRIMARY__DISABLED,
      })}>
      {/* 
      <Tab.Screen
        name={screens.DemoScreen}
        options={{
          title: t('demo'),
          tabBarLabelStyle: {
            fontWeight: fontWeights.bold,
            fontSize: fontSizes.verySmall,
          },
          tabBarIcon: ({ color, size }) => (
            // https://infinitered.github.io/ionicons-version-3-search/
            <Ionicons name="gift" color={color} size={size} />
          ),
        }}
        component={DemoScreen}
      /> */}

      <Tab.Screen
        name={screens.HOME}
        options={{
          title: t('home'),
          tabBarLabelStyle: {
            fontWeight: fontWeights.bold,
            fontSize: fontSizes.verySmall,
          },
          tabBarIcon: ({ color, size }) => (
            // https://infinitered.github.io/ionicons-version-3-search/
            <Ionicons name="md-home" color={color} size={size} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={screens.ACCOUNT}
        options={{
          title: t('account'),
          tabBarLabelStyle: {
            fontWeight: fontWeights.bold,
            fontSize: fontSizes.verySmall,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-cog" color={color} size={size} />
          ),
        }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}
