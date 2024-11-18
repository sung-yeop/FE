import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../style/Theme';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Bottom'>;

const Fail = () => {
  const navigation = useNavigation<NavigationProps>();

  const onClickBtn = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Bottom',
          params: {screen: '알려줘'},
        },
      ],
    });
  };
  return (
    <View>
      <Text>인증이 실패했습니다!</Text>
      <Text>알려줘 페이지에서 다시 진행해주세요!</Text>
      <TouchableOpacity style={theme.buttonContainerStyle} onPress={onClickBtn}>
        <Text style={theme.buttonTextStyle}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Fail;

const styles = StyleSheet.create({});
