import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyProfile from '../components/ProfilePageComponenets/MyProfile';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../App';
import LogoutBtn from '../components/ProfilePageComponenets/LogoutBtn';
import GAddUser from '../components/ProfilePageComponenets/GAddUser/GAddUser';
import UpdatePrimium from '../components/ProfilePageComponenets/UpdatePrimium';
import {useUserInfoManager} from '../hooks/useUserInfoManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TestPage'>;

const ProfilePage = () => {
  const navigation = useNavigation<NavigationProp>();
  const userInfo = useUserInfoManager();
  const [isGuardian, setIsGuardian] = useState<boolean>(false);

  useEffect(() => {
    const guardianCheck = async () => {
      try {
        const response = await AsyncStorage.getItem('isGuardian');
        setIsGuardian(response === 'Yes');
      } catch (error) {
        console.error('Error checking guardian status:', error);
      }
    };

    guardianCheck();
  }, []);

  if (!userInfo) {
    // 로딩 상태를 보여줄 수 있음
    return <Text>Loading...</Text>;
  }

  if (userInfo === undefined) {
    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <MyProfile name={userInfo.name} id={userInfo.id} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ViewContent}>
          {isGuardian && <GAddUser />}
          <UpdatePrimium />
          {/* <GAddUser /> */}
          {/* <ProfileSetting /> */}
          <LogoutBtn />
        </View>
        <Text onPress={() => navigation.navigate('TestPage')}>
          테스트 페이지
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginTop: 20,
  },
  content: {
    flex: 1,
  },
  ViewContent: {
    flex: 1,
    gap: 10,
  },
});
