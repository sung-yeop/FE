import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import ReportSelector from '../components/ReportPageComponents/ReportSelector';
import ReportChart from '../components/ReportPageComponents/ReportChart';
import ReportDetailAnalyisis from '../components/ReportPageComponents/ReportDetailAnalyisis';
import ReportSelectMission from '../components/ReportPageComponents/ReportSelectMission';
import {AlarmImg} from '../../asset/images';

const ReportPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text={'간단 분석'} img={AlarmImg}></PageHeader>
      <ScrollView style={styles.content}>
        <View style={styles.ViewContent}>
          <ReportSelectMission />
          <ReportSelector />
          <ReportChart />
          <ReportDetailAnalyisis />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportPage;

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
  ViewContent: {
    flex: 1,
    gap: 15,
  },
});
