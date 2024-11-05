import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageHeader = ({text}: {text: string}) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
});
