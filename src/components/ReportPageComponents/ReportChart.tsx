import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useReportManager} from '../../hooks/useReportManager';

const {height} = Dimensions.get('window');
const ReportChart = () => {
  const {current} = useReportManager();

  if (current.duration === 'Today') return null;
  return (
    <View style={styles.Container}>
      <Text style={styles.Temp}> ReportChart</Text>
    </View>
  );
};

export default ReportChart;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'column',
    height: height * 0.4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Temp: {
    fontWeight: 'bold',
    fontSize: 32,
  },
});
