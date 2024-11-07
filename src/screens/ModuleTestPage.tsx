import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomTimePicker from '../module/CustomTimePicker';
import {SafeAreaView} from 'react-native-safe-area-context';

const ModuleTestPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.goBack}>뒤로가기</Text>
      </TouchableOpacity>
      {/* <CustomTimePicker /> */}
    </SafeAreaView>
  );
};

export default ModuleTestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  goBack: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
