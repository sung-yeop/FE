import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RenderProp} from './SignUpStep_1';
import {theme} from '../../../style/Theme';

const SignUpStep_6 = ({updateCurrent, setStep}: RenderProp) => {
  if (updateCurrent === undefined || setStep === undefined) {
    return;
  }

  useEffect(() => {
    updateCurrent({isGuardian: false});
  }, []);

  return (
    <View style={styles.container}>
      <Text style={theme.typography.h2}>보호자 회원인가요?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.eachButtonContainer}
          onPress={() => {
            updateCurrent({isGuardian: true});
            //마지막 스텝으로 이동 필요
            setStep(8);
          }}>
          <Text style={styles.buttonText}>네</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.eachButtonContainer,
            {backgroundColor: theme.colors.primary.main},
          ]}
          onPress={() => {
            updateCurrent({isGuardian: false});
            setStep(7);
          }}>
          <Text style={[styles.buttonText, {color: 'white'}]}>아니요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpStep_6;

const styles = StyleSheet.create({
  container: {
    gap: 40,
  },
  contentContainer: {
    gap: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  eachButtonContainer: {
    borderRadius: 6,
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flex: 0.5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});
