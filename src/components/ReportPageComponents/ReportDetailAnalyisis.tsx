import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ReportDetailAnalyisis = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>데이터 분석{'\n'}간단한 표 추가 예정</Text>
    </View>
  );
};

export default ReportDetailAnalyisis;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    justifyContent: 'center',
    height: 300,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
  },
});
