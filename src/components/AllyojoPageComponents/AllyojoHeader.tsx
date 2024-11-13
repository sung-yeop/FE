import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../../style/Theme';

const AllyojoHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerSubContainer}>
        <Text style={[theme.typography.h1, {textAlign: 'center'}]}>
          오늘은 무엇을 해야할까요?
        </Text>
        <Text style={[theme.typography.h1, {textAlign: 'center'}]}>
          모아서 확인해요!
        </Text>
      </View>
    </View>
  );
};

export default AllyojoHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  headerSubContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    gap: 4,
  },
});
