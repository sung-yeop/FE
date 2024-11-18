import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {allManagingSeniorsSelector} from '../../../../atoms';
import {SeniorInfo} from '../../../../types';

type Props = {
  setSelectedUser: React.Dispatch<React.SetStateAction<SeniorInfo | undefined>>;
};

const Modal_Select_Senior_Content = ({setSelectedUser}: Props) => {
  const [seniors, setSeniors] = useRecoilState(allManagingSeniorsSelector);

  return (
    <View style={styles.container}>
      {seniors.map((senior: SeniorInfo) => (
        <TouchableOpacity
          key={senior.username}
          style={styles.btnContainer}
          onPress={() => setSelectedUser(senior)}>
          <Text style={styles.textStyle}>{senior.username}</Text>
          <Text style={styles.textStyle}>{senior.name}</Text>
          <Text style={styles.textStyle}>{senior.phoneNumber}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Modal_Select_Senior_Content;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  btnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  textStyle: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
