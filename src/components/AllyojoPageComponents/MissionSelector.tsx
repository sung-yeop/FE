import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {theme} from '../../style/Theme';

type Props = {
  missionSelect: 'Every' | 'Week';
  setMissionSelect: React.Dispatch<React.SetStateAction<'Every' | 'Week'>>;
};

const {width} = Dimensions.get('window');

const MissionSelector = ({missionSelect, setMissionSelect}: Props) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: missionSelect === 'Every' ? 0 : 1,
      useNativeDriver: true,
      tension: 68,
      friction: 12,
    }).start();
  }, [missionSelect]);

  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [
                {
                  translateX: slideAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 169],
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
    left: 1,
    width: '50%',
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
