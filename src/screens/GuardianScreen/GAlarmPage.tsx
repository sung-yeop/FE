import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../../components/PageHeader';
import {AlarmImg} from '../../../asset/images';
import GAlarmList from '../../components/Guardian/GAlarmPageComponents/GAlarmList';
import AddAlarmButton from '../../components/AlarmPageComponents/AddAlarmButton';
import GAlarmSeniorSelect from '../../components/Guardian/GAlarmPageComponents/GAlarmSeniorSelect';

const GAlarmPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text="보호자 알람 관리" img={AlarmImg} />
      <ScrollView style={styles.content}>
        <GAlarmList />
      </ScrollView>
      <AddAlarmButton>
        <GAlarmSeniorSelect />
      </AddAlarmButton>
    </SafeAreaView>
  );
};

export default GAlarmPage;

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
