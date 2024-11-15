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

        await AsyncStorage.setItem(
          'missions',
          JSON.stringify([
            {missionId: 'Manage blood pressure'},
            {missionId: 'Eat Medician'},
          ]),
        );

        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if (token) {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Bottom',
                params: {screen: '알려줘'},
              },
            ],
          });
          return;
        }
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
