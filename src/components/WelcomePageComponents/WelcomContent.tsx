import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WelcomContent = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>WelcomContent</Text>
      </View>
    </View>
  );
};

export default WelcomContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
