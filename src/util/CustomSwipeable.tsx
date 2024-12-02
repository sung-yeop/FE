import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';

type CustomSwipeableProps = {
  children: React.ReactNode;
  rightComponent: React.ReactNode;
};

const CustomSwipeable = ({children, rightComponent}: CustomSwipeableProps) => {
  const pan = useRef(new Animated.Value(0)).current;
  const rightWidth = 80;

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: 0,
      useNativeDriver: true,
      tension: 40,
      friction: 5,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10; // 작은 움직임은 무시
      },
      onPanResponderMove: (_, gestureState) => {
        const newX = gestureState.dx;
        if (newX <= 0 && newX >= -rightWidth) {
          pan.setValue(newX);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const velocity = Math.abs(gestureState.vx);
        const isQuickSwipe = velocity > 0.5;

        if (isQuickSwipe || gestureState.dx < -rightWidth / 2) {
          // 빠른 스와이프거나 절반 이상 스와이프되면 완전히 열기
          Animated.spring(pan, {
            toValue: -rightWidth,
            useNativeDriver: true,
            tension: 40,
            friction: 5,
          }).start();
        } else {
          // 원위치로 복귀
          resetPosition();
        }
      },
      onPanResponderTerminate: () => {
        // 제스처가 중단되면 원위치로
        resetPosition();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={[styles.rightComponentContainer, {width: rightWidth}]}>
        {rightComponent}
      </View>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{translateX: pan}],
          },
        ]}
        {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden', // 중요: 넘치는 부분을 숨김
  },
  content: {
    backgroundColor: 'white',
    zIndex: 2,
  },
  rightComponentContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    zIndex: 1,
  },
});

export default CustomSwipeable;
