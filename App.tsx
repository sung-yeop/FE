import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import BottomTab from './src/components/BottomTab';
import {RecoilRoot} from 'recoil';
import Initializer from './src/components/Initializer';
import {DeviceEventEmitter} from 'react-native';
import AlarmScreen from './src/components/AlarmScreen/AlarmScreen';
import LoginPage from './src/screens/SignInPage';
import WelcomePage from './src/screens/WelcomePage';
import SignInPage from './src/screens/SignInPage';
import SignUpPage from './src/screens/SignUpPage';
import FindPasswordPage from './src/screens/FindPasswordPage';

// RootStackParamList 타입 정의
export type RootStackParamList = {
  Bottom: undefined;
  AlarmScreen: {alarmId: string};
  SignIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
  FindPassWord: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  React.useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'showAlarmScreen',
      (event: {alarmId: string}) => {
        if (navigationRef.isReady()) {
          navigationRef.navigate('AlarmScreen', {
            alarmId: event.alarmId,
          });
        }
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <RecoilRoot>
      <Initializer />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Bottom" component={BottomTab} />
          <Stack.Screen name="AlarmScreen" component={AlarmScreen} />
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="SignIn" component={SignInPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="FindPassWord" component={FindPasswordPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
