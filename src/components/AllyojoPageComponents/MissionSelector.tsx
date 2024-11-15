import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {theme} from '../../style/Theme';

type Props = {
  missionSelect: 'Every' | 'Week';
  setMissionSelect: React.Dispatch<React.SetStateAction<'Every' | 'Week'>>;
};

const MissionSelector = ({missionSelect, setMissionSelect}: Props) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const containerRef = useRef<View>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // 컨테이너 너비 측정
  const onLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: missionSelect === 'Every' ? 0 : 1,
      useNativeDriver: true,
      tension: 68,
      friction: 12,
    }).start();
  }, [missionSelect]);

  const sliderWidth = containerWidth ? (containerWidth - 4) / 2 : 0;
  const slideDistance = containerWidth ? sliderWidth + 2 : 0;

  return (
    <View style={styles.container}>
      <View
        ref={containerRef}
        onLayout={onLayout}
        style={styles.selectorContainer}>
        <Animated.View
          style={[
            styles.slider,
            {
              width: sliderWidth,
              transform: [
                {
                  translateX: slideAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, slideDistance], // 왼쪽 padding 2px 고려
                  }),
                },
              ],
            },
          ]}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.selectButton]}
          onPress={() => setMissionSelect('Every')}>
          <Text
            style={[
              styles.buttonText,
              missionSelect === 'Every' && styles.selectedText,
            ]}>
            매일
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.selectButton]}
          onPress={() => setMissionSelect('Week')}>
          <Text
            style={[
              styles.buttonText,
              missionSelect === 'Week' && styles.selectedText,
            ]}>
            매주
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MissionSelector;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 2,
    borderRadius: 30,
    position: 'relative',
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 5,
  },
  slider: {
    position: 'absolute',
    top: 2,
    height: 46,
    backgroundColor: theme.colors.primary.main,
    borderRadius: 30,
    zIndex: 1,
  },
  selectButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    zIndex: 2,
    height: 36,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#666',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
});
