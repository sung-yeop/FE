import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../style/Theme';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Bottom'>;

const Success = () => {
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
      <Text>인증이 완료되었습니다!</Text>
      <TouchableOpacity style={theme.buttonContainerStyle} onPress={onClickBtn}>
        <Text style={theme.buttonTextStyle}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
