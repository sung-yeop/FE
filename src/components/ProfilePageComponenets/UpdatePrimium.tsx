import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const UpdatePrimium = () => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Temp}>UpdatePrimium</Text>
    </View>
  );
};

export default UpdatePrimium;

const styles = StyleSheet.create({
  Container: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  Temp: {
    textAlign: 'center',
  },
});
