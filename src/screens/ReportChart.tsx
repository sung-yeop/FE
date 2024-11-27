import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-gifted-charts';

const ReportChart = ({data, averageValue}: any) => {
  let chartData;

  if (data.length === 1) {
    chartData = [
      {value: data[0].value, label: ''},
      {value: data[0].value, label: data[0].label},
      {value: data[0].value, label: ''},
    ];
  } else {
    chartData = data;
  }

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

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={260}
        spacing={300 / (data.length - 1)}
        xAxisLabelTextStyle={{color: 'rgba(150, 150, 150, 0.8)'}}
        initialSpacing={20}
        thickness={2}
        areaChart
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
        secondaryData={
          averageValue
            ? Array(data.length).fill({
                value: averageValue,
                label: '',
              })
            : undefined
        }
        secondaryLineConfig={{
          color: '#FF3B30',
          thickness: 2,
          hideDataPoints: true,
          startOpacity: 0,
          endOpacity: 0,
        }}
      />
    </View>
  );
};

export default ReportChart;

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
