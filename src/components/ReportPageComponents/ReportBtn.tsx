import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {theme} from '../../style/Theme';

type Props = {
  onPress: () => void;
};

const ReportBtn = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={theme.buttonContainerStyle}>
      <Text style={theme.buttonTextStyle}>분석 받기</Text>
    </TouchableOpacity>
  );
};

export default ReportBtn;

const styles = StyleSheet.create({});
