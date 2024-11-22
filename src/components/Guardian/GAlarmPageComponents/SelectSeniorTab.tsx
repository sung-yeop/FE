import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SeniorInfo} from '../../../types';

type Props = {
  seniors: SeniorInfo[];
  selectSenior: string;
  setSelectSenior: React.Dispatch<React.SetStateAction<string>>;
};

const SelectSeniorTab = ({seniors, selectSenior, setSelectSenior}: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textHeader}>
          현재 사용자분께서 추가하신 어르신들이예요
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.subContainer}
        showsHorizontalScrollIndicator={false}>
        {seniors.length > 0 ? (
          seniors.map(senior => (
            <TouchableOpacity
              key={senior.phoneNumber}
              style={[
                styles.selectContainer,
                selectSenior === senior.name && {backgroundColor: 'gray'},
              ]}
              onPress={() => setSelectSenior(senior.name)}>
              <Text
                style={[
                  styles.selecText,
                  selectSenior === senior.name && styles.activeText,
                ]}>
                {senior.name}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>관리하고 계신 사용자가 없습니다!</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SelectSeniorTab;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: '#dee2e6',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subContainer: {gap: 12},
  selectContainer: {
    borderRadius: 12,
    padding: 10,
    borderWidth: 0.5,
    marginRight: 12,
  },
  activeContainer: {
    backgroundColor: 'gray',
    color: 'white',
  },
  selecText: {
    color: 'black',
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
  },
  activeText: {
    color: 'white',
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
  },
  textHeader: {
    fontFamily: 'Pretendard-Bold',
    color: 'black',
    fontSize: 16,
  },
});
