import React, {ReactNode} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfilePage from '../screens/ProfilePage';
import Ionic from 'react-native-vector-icons/Ionicons';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import GAlarmPage from '../screens/GuardianScreen/GAlarmPage';
import ReportPage from '../screens/ReportPage';
import GReportPage from '../screens/GuardianScreen/GReportPage';
const getTabBarIcon = (
  route: string,
  focused: boolean,
  color: string,
  size: number,
) => {
  let iconName: string = '';
  color = 'black';
  if (route === '알람') {
    iconName = focused ? 'alarm' : 'alarm-outline';
    // } else if (route === '알려줘') {
    //   iconName = focused ? 'bulb' : 'bulb-outline';
  } else if (route === '리포트') {
    iconName = focused ? 'document-text' : 'document-text-outline';
  } else if (route === '내정보') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Ionic name={iconName} size={size} color={color} />;
};

const {height} = Dimensions.get('window');

export default function BottomTabGuardian(): ReactNode {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({focused, color, size}) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          ...Platform.select({
            android: styles.tabBarAndroid,
            ios: styles.tabBarIOS,
          }),
        },
      })}>
      <Tab.Screen name="알람" component={GAlarmPage} />
      <Tab.Screen name="리포트" component={GReportPage} />
      <Tab.Screen name="내정보" component={ProfilePage} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarAndroid: {
    height: height * 0.08,
    paddingBottom: 15,
    paddingTop: 15,
    elevation: 8,
  },
  tabBarIOS: {
    height: height * 0.1,
    paddingBottom: 20,
    paddingTop: 5,
  },
});
