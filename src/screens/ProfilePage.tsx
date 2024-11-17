import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import MyProfile from '../components/ProfilePageComponenets/MyProfile';
import ProfileSetting from '../components/ProfilePageComponenets/ProfileSetting';
import UpdatePrimium from '../components/ProfilePageComponenets/UpdatePrimium';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../App';
import LogoutBtn from '../components/ProfilePageComponenets/LogoutBtn';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TestPage'>;

const ProfilePage = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <MyProfile />
      <ScrollView style={styles.content}>
        <View style={styles.ViewContent}>
          <UpdatePrimium />
          <ProfileSetting />
          <LogoutBtn />
        </View>
        <Text onPress={() => navigation.navigate('TestPage')}>
          Test 페이지 이동
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  content: {
    flex: 1,
  },
  ViewContent: {
    flex: 1,
    gap: 5,
  },
});
