import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-gifted-charts';

const ReportChartBP = ({
  data,
  data2,
  lowAverageValue,
  highAverageValue,
}: any) => {
  let chartData;
  if (!data || data.length === 0) {
    chartData = [{value: 0, label: ''}];
  } else if (data.length === 1) {
    chartData = [
      {value: data[0].value, label: ''},
      {value: data[0].value, label: data[0].label},
    ];
  } else {
    chartData = data;
  }

  let chartData2;
  if (!data2 || data2.length === 0) {
    chartData2 = [{value: 0, label: ''}];
  } else if (data2.length === 1) {
    chartData2 = [
      {value: data2[0].value, label: ''},
      {value: data2[0].value, label: data2[0].label},
    ];
  } else {
    chartData2 = data2;
  }

  console.log('ReportChartBP | chartData : ', chartData);
  console.log('ReportChartBP | chartData2 : ', chartData2);

  const pointerConfig = {
    pointerColor: 'white',
    radius: 8,
    pointerStripColor: 'gray',
    pointerStripWidth: 2,
    pointerLabelWidth: 100,
    pointerLabelHeight: 40,
    activatePointersOnLongPress: false,
    autoAdjustPointerLabelPosition: true,
    pointerLabelComponent: (items: any) => {
      return (
        <View style={styles.pointerLabel}>
          <Text style={styles.pointerLabelText}>{items[0].value}</Text>
        </View>
      );
    },
  };

  const maxValue1 = Math.max(
    ...chartData.map((item: {label: string; value: number}) => item.value),
  );
  const maxValue2 = Math.max(
    ...chartData2.map((item: {label: string; value: number}) => item.value),
  );
  const maxValue = Math.max(maxValue1, maxValue2);

  return (
    <View style={styles.container}>
      <LineChart
        maxValue={maxValue}
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={260}
        spacing={data.length > 1 ? 300 / (data.length - 1) : 300}
        xAxisLabelTextStyle={{color: 'rgba(150, 150, 150, 0.8)'}}
        initialSpacing={20}
        thickness={2}
        color="#64B5F6" // 부드러운 푸른색
        startFillColor="rgba(100, 181, 246, 0.2)"
        endFillColor="rgba(100, 181, 246, 0.05)"
        xAxisColor="rgba(150, 150, 150, 0.3)"
        yAxisColor="rgba(150, 150, 150, 0.3)"
        xAxisThickness={0.5}
        yAxisThickness={0.5}
        yAxisTextStyle={{color: 'rgba(150, 150, 150, 0.8)'}}
        startOpacity={0.9}
        endOpacity={0.2}
        hideRules={true}
        noOfSections={4}
        pointerConfig={pointerConfig}
        secondaryData={chartData2} // 두 번째 데이터 세트 추가
        secondaryLineConfig={{
          color: '#FF9800', // 두 번째 라인 색상 (오렌지)
          thickness: 2,
          hideDataPoints: false, // 데이터 포인트 표시
          dataPointsColor: '#FF9800',
          dataPointsRadius: 4,
          startOpacity: 1,
          endOpacity: 1,
        }}
      />
    </View>
  );
};

export default ReportChartBP;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderRadius: 12,
  },
  pointerLabel: {
    height: 40,
    width: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  pointerLabelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
