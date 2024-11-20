import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {allManagingSeniorsSelector} from '../../../atoms';
import Modal_Select_Senior from './Modal_Select_Senior/Modal_Select_Senior';
import {useCurrentAlarm} from '../../../hooks/useCurrentAlarm';
import {theme} from '../../../style/Theme';

const GAlarmSeniorSelect = () => {
  const [seniors] = useRecoilState(allManagingSeniorsSelector);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {current} = useCurrentAlarm();

  return (
    <View style={styles.container}>
      {seniors.length === 0 && (
        <View style={styles.seniorContainer}>
          <Text style={styles.selectText}>
            관리하고 계신 보호자가 없습니다!
          </Text>
          <Text style={styles.selectDesText}>
            설정 페이지에서 유저를 추가해주세요!
          </Text>
        </View>
      )}

      {seniors.length > 0 && (
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <View style={styles.seniorContainer}>
            <Text
              style={[
                theme.typography.h2,
                {textAlign: 'center', color: 'white'},
              ]}>
              사용자 선택하기
            </Text>
            <Text
              style={[
                theme.typography.h3,
                {textAlign: 'center', color: 'white'},
              ]}>
              {current.username?.username}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <Modal_Select_Senior
        isVisible={isVisible}
        onCloseModal={() => setIsVisible(false)}
      />
    </View>
  );
};

export default GAlarmSeniorSelect;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  seniorContainer: {
    borderRadius: 12,
    backgroundColor: 'gray',
    borderColor: 'gray',
    gap: 12,
    paddingVertical: 12,
  },
  selectText: {
    fontFamily: 'Pretendard-Bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  selectDesText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
