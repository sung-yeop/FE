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
        await AsyncStorage.setItem('isGuardian', 'Yes');

        // await AsyncStorage.clear();

        // For Test report
        await AsyncStorage.setItem(
          'missions',
          JSON.stringify([
            {missionId: 'Manage blood pressure'},
            {missionId: 'Eat Medician'},
          ]),
        );

        const token = await AsyncStorage.getItem('token');
        const isGuardian = await AsyncStorage.getItem('isGuardian');

        if (token && isGuardian === 'Yes') {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'BottomTabGuardian',
                params: {screen: '알람'},
              },
            ],
          });
          return;
        } else if (token && isGuardian === 'No') {
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
        throw new Error(
          'Initializer.tsx -> 토큰 혹은 유저 권한에 대한 정보가 저장되어있지 않으니 다시 로그인해주세요!',
        );
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
