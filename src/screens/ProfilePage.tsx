import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyProfile from '../components/ProfilePageComponenets/MyProfile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../App';
import LogoutBtn from '../components/ProfilePageComponenets/LogoutBtn';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {userSelector, userState} from '../atoms';
import GAddUser from '../components/ProfilePageComponenets/GAddUser/GAddUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GuardianAPI} from '../api/GuardianAPI';
import {UserAPI} from '../api/UserAPI';
import UpdatePrimium from '../components/ProfilePageComponenets/UpdatePrimium';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TestPage'>;

const ProfilePage = () => {
  const navigation = useNavigation<NavigationProp>();
  const userInfo = useRecoilValue(userSelector);
  // const setUserState = useSetRecoilState(userState);

  // useEffect(() => {
  //   const updateUserInfo = async () => {
  //     try {
  //       const isGuardian = await AsyncStorage.getItem('isGuardian');
  //       let response;

  //       if (isGuardian === 'Yes') {
  //         response = await GuardianAPI.getGuardianInfo();
  //         setUserState({
  //           ...response,
  //           id: response.guardianName,
  //           isGuardian: true,
  //         });
  //       } else if (isGuardian === 'No') {
  //         response = await UserAPI.getUserInfo();
  //         setUserState({
  //           ...response,
  //           id: response.username,
  //           isGuardian: false,
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error updating user info:', error);
  //     }
  //   };

  //   updateUserInfo();
  // }, []); // 컴포넌트 마운트 시 실행

  if (!userInfo) {
    // 로딩 상태를 보여줄 수 있음
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <MyProfile name={userInfo.name} id={userInfo.id} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ViewContent}>
          {userInfo.isGuardian && <GAddUser />}
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
