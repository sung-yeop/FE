import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../../components/PageHeader';
import {AlarmImg} from '../../../asset/images';
import GAlarmList from '../../components/Guardian/GAlarmPageComponents/GAlarmList';
import AddAlarmButton from '../../components/AlarmPageComponents/AddAlarmButton';
import GAlarmSeniorSelect from '../../components/Guardian/GAlarmPageComponents/GAlarmSeniorSelect';
import {useGuardianManager} from '../../hooks/useGuardianManager';
import SelectSeniorTab from '../../components/Guardian/GAlarmPageComponents/SelectSeniorTab';

const GAlarmPage = () => {
  const [selectSenior, setSelectSenior] = useState<string>('');
  const {seniors} = useGuardianManager();

  useEffect(() => {
    if (seniors.length > 0) {
      console.log('ENTER');
      setSelectSenior(seniors[0].name);
      return;
    }
    setSelectSenior('');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text="보호자 알람 관리" img={AlarmImg} />
      <SelectSeniorTab
        seniors={seniors}
        selectSenior={selectSenior}
        setSelectSenior={setSelectSenior}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <GAlarmList selectSenior={selectSenior} />
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
