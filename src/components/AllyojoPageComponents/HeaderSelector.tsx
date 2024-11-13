import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {theme} from '../../style/Theme';

type Props = {
  handleComp: (pageNav: 'Todo' | 'Mission' | 'Delay') => void;
  select: Tab['key'];
};

interface Tab {
  key: 'Todo' | 'Mission' | 'Delay';
  description: string;
}

const tabs: Tab[] = [
  {key: 'Todo', description: '할일 확인하기'},
  {key: 'Mission', description: '미션 모아보기'},
  {key: 'Delay', description: '미션 확인하기'},
];

const {width} = Dimensions.get('window');
const TAB_PADDING = 20; // 탭의 좌우 패딩값 정의
const TAB_WIDTH = (width - TAB_PADDING * 2) / 3; // 실제 탭 하나의 너비

const HeaderSelector = ({handleComp, select}: Props) => {
  const indicatorRef = useRef(new Animated.Value(0)).current;

  const parseKeyToIdx = (selectTab: Tab['key']) => {
    if (selectTab === 'Todo') {
      return 0;
    } else if (selectTab === 'Mission') {
      return 1;
    } else return 2;
  };

  const handleTabPress = (selectTab: Tab['key']) => {
    Animated.spring(indicatorRef, {
      toValue: parseKeyToIdx(selectTab) * TAB_WIDTH + TAB_PADDING + 15, // 패딩값 고려
      useNativeDriver: true,
      tension: 68,
      friction: 10,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectTabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            style={styles.selectTab}
            key={tab.key}
            onPress={() => {
              handleComp(tab.key);
              handleTabPress(tab.key);
            }}>
            <Text
              style={
                select === tab.key ? styles.activeText : styles.headerText
              }>
              {tab.description}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{translateX: indicatorRef}],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default HeaderSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  selectTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: TAB_PADDING, // 좌우 패딩 추가
  },
  selectTab: {
    justifyContent: 'center',
    width: TAB_WIDTH, // 실제 탭 너비 적용
    alignItems: 'center', // 텍스트 중앙 정렬
  },
  headerText: {
    padding: 10,
    fontFamily: 'Pretendard-Bold',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    width: TAB_WIDTH - 30, // 실제 탭 너비와 동일하게 설정
    height: 3,
    backgroundColor: theme.colors.primary.main,
    borderRadius: 3,
    bottom: 0,
  },
  activeText: {
    padding: 10,
    fontFamily: 'Pretendard-Bold',
    color: theme.colors.primary.main,
    fontSize: 16,
    textAlign: 'center',
  },
});
