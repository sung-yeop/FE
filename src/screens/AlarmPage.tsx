import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import AddAlarmButton from '../components/AlarmPageComponents/AddAlarmButton';
import AlarmList from '../components/AlarmPageComponents/AlarmList';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AlarmImg} from '../../asset/images';
import SelectAlarmList from '../components/AlarmPageComponents/SelectAlarmList';

type AlarmScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

const AlarmPage = () => {
  const navigation = useNavigation<AlarmScreenNavigationProp>();
  const [isGuardianCheck, setIsGuardianCheck] = useState<boolean>(false);

  useEffect(() => {
    console.log('IsGuardianCheck : ', isGuardianCheck);
  }, [isGuardianCheck]);

  const toggleGuardianCheck = () => {
    setIsGuardianCheck(!isGuardianCheck);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text="오늘의 알림" img={AlarmImg} />
      <SelectAlarmList
        onClick={toggleGuardianCheck}
        isGuardianCheck={isGuardianCheck}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <AlarmList isGuardian={isGuardianCheck} />
      </ScrollView>
      <AddAlarmButton />
    </SafeAreaView>
  );
};

export default AlarmPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 12,
  },
});
