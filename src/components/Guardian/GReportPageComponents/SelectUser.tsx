import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {allManagingSeniorsSelector} from '../../../atoms';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../../style/Theme';

type Props = {
  username: string;
  updateCurrnetUsername: (username: string) => void;
};

const SelectUser = ({username, updateCurrnetUsername}: Props) => {
  const seniors = useRecoilValue(allManagingSeniorsSelector);

  const onClickSenior = (seniorUsername: string) => {
    updateCurrnetUsername(seniorUsername);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보호 대상자 선택</Text>
      <View style={styles.userList}>
        {seniors.map(senior => (
          <TouchableOpacity
            key={senior.username}
            style={[
              styles.userCard,
              username === senior.username && styles.selectedCard,
            ]}
            onPress={() => onClickSenior(senior.username)}
            activeOpacity={0.7}>
            <View style={styles.userInfo}>
              <Icon
                name="account-circle"
                size={24}
                color={
                  username === senior.username
                    ? theme.colors.primary.main
                    : '#666'
                }
              />
              <Text
                style={[
                  styles.userName,
                  username === senior.username && styles.selectedText,
                ]}>
                {senior.name}
              </Text>
            </View>
            {username === senior.username && (
              <Icon
                name="check-circle"
                size={20}
                color={theme.colors.primary.main}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SelectUser;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    marginBottom: 12,
  },
  userList: {
    gap: 8,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCard: {
    backgroundColor: theme.colors.primary.light + '15',
    borderColor: theme.colors.primary.main,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    color: '#333',
  },
  selectedText: {
    color: theme.colors.primary.main,
    fontFamily: 'Pretendard-Bold',
  },
});
