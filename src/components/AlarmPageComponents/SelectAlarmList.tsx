import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {theme} from '../../style/Theme';

type Props = {
  onClick: () => void;
  isGuardianCheck: boolean;
};

const SelectAlarmList = ({onClick, isGuardianCheck}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.button, !isGuardianCheck && styles.activeButton]}
          onPress={onClick}>
          <Text
            style={[styles.buttonText, !isGuardianCheck && styles.activeText]}>
            내 알람
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isGuardianCheck && styles.activeButton]}
          onPress={onClick}>
          <Text
            style={[styles.buttonText, isGuardianCheck && styles.activeText]}>
            보호자 알람
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectAlarmList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    minWidth: 100,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: theme.colors.primary.main,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    color: '#666',
  },
  activeText: {
    color: 'white',
    fontFamily: 'Pretendard-Bold',
  },
});
