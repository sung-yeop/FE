import {useEffect} from 'react';
import {useAlarmManager} from '../hooks/useAlarmManager';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

const Initializer = () => {
  // const alarmManager = useAlarmManager();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        //for test toekn create
        await AsyncStorage.setItem('token', '123');

        const token = await AsyncStorage.getItem('token');
        if (!token) {
          navigation.navigate('SignIn');
          return;
        }
        // alarmManager.loadAlarms();
      } catch (error) {
        console.error('Error checking login status:', error);
        navigation.navigate('SignIn');
      }
    };

    checkLoginStatus();
  }, [navigation]);
  return null;
};

export default Initializer;
