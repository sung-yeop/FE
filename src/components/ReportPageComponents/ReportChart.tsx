import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useReportManager} from '../../hooks/useReportManager';
import {LineChart} from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`, // 회색 선
  labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`, // 회색 라벨
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#ffffff',
    fill: '#000000', // 검정색 점
  },
  propsForBackgroundLines: {
    strokeDasharray: '6', // 점선 효과
    stroke: '#e3e3e3', // 연한 회색
    strokeWidth: 1,
  },
  propsForLabels: {
    fontSize: 12,
  },
};

const {height} = Dimensions.get('window');
const ReportChart = ({data}: any) => {
  const {current} = useReportManager();
  console.log('DATA.Labels: ', data.labels.length);
  console.log('DATA.Data of DataSet: ', data.datasets[0].data);
  let filteredChart;

  if (data.labels.length === 1) {
    console.log('Enter');
    filteredChart = {
      labels: ['', data.labels[0], ''],
      datasets: [
        {
          ...data.datasets[0],
          data: [
            data.datasets[0].data[0],
            data.datasets[0].data[0],
            data.datasets[0].data[0],
          ],
        },
      ],
    };
  } else {
    filteredChart = data;
  }

  if (current.duration === 'Today') return null;

  return (
    <View style={styles.Container}>
      <LineChart
        data={filteredChart}
        width={Dimensions.get('window').width}
        height={260}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withVerticalLines={false}
        segments={filteredChart.labels.length}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero={true}
        withHorizontalLines={false}
        horizontalLabelRotation={0}
      />
    </View>
  );
};

export default ReportChart;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    padding: 16,
  },
});
