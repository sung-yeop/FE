import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MissionCareType} from '../../types';

type Props = {
  setSelectMission: React.Dispatch<React.SetStateAction<MissionCareType>>;
};

const Modal_MissionContent = ({setSelectMission}: Props) => {
  return (
    <View>
      <Text>User의 mission 데이터 루프</Text>
      <Text>MissionItem 컴포넌트로 렌더링</Text>
      <Text>setSelectMission으로 현재 선택된 미션 데이터 저장</Text>
    </View>
  );
};

export default Modal_MissionContent;

const styles = StyleSheet.create({});
