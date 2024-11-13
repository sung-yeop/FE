import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import AddAlarmButton from '../components/AlarmPageComponents/AddAlarmButton';
import AlarmList from '../components/AlarmPageComponents/AlarmList';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AlarmImg} from '../../asset/images';

type AlarmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

const AlarmPage = () => {
  const navigation = useNavigation<AlarmScreenNavigationProp>();

  const navigateToLogin = () => {
    navigation.navigate('Welcome');
  };
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text="오늘의 알림" img={AlarmImg} />
      <ScrollView style={styles.content}>
        <AlarmList />
      </ScrollView>
      {/* <TouchableOpacity onPress={navigateToLogin}>
        <Text>Welcome 페이지로 이동</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TestPage')}>
        <Text>Go to Test Page</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ModuleTestPage')}>
        <Text>Go to Module Test Page</Text>
      </TouchableOpacity> */}
      <AddAlarmButton />
    </SafeAreaView>
  );
};

export default AlarmPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 12,
  },
});
