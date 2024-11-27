import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useReportManager} from '../../hooks/useReportManager';
import {LineChart} from 'react-native-chart-kit';
import {Circle} from 'react-native-svg';

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
  // fillShadowGradient: '#2196F3', // 영역 색상
  // fillShadowGradientOpacity, // 투명도
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffffff',
    fill: '#2196F3',
  },
  propsForBackgroundLines: {
    strokeDasharray: '5,5',
    stroke: '#f0f0f0',
    strokeWidth: 1.5,
  },
  propsForLabels: {
    fontSize: 13,
    fontWeight: '500',
  },
};

const ReportChart = ({data}: any) => {
  if (data === undefined) return null;
  const {current} = useReportManager();
  console.log('DATA.Labels: ', data.labels.length);
  console.log('DATA.Data of DataSet: ', data.datasets[0].data);
  const filteredChart =
    data.labels.length === 1
      ? {
          labels: ['', data.labels[0], ''],
          datasets: [
            {
              ...data.datasets[0],
              data: Array(3).fill(Number(data.datasets[0].data[0])),
            },
          ],
        }
      : data;

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
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        segments={4}
        withVerticalLines={false}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero={true}
        withHorizontalLines={false}
        horizontalLabelRotation={0}
        getDotColor={(dataPoint, index) => '#2196F3'}
        renderDotContent={({x, y, index}) => (
          <Circle
            key={index}
            cx={x}
            cy={y}
            r={8}
            fill="rgba(33, 150, 243, 0.1)"
          />
        )}
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
