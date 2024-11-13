import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Alarm, Todo} from '../types';

type Props = {
  target: Alarm | Todo;
  updateFun: (updates: Partial<Alarm> | Partial<Todo>) => void;
};

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

const CustomTimePicker = ({target, updateFun}: Props) => {
  // 초기값 설정
  const initialHour = target.timer.getHours();
  const [ampm, setAmpm] = useState(Number(initialHour) <= 12 ? 'am' : 'pm');
  const [hour, setHour] = useState(initialHour % 12 || 12);
  const [minute, setMinutes] = useState(
    target?.timer.getMinutes() || new Date().getMinutes(),
  );

  // 선택된 인덱스 관리
  const [selectedAmPmIndex, setSelectedAmPmIndex] = useState(0);
  const [selectedHourIndex, setSelectedHourIndex] = useState(0);
  const [selectedMinuteIndex, setSelectedMinuteIndex] = useState(0);

  // ScrollView Refs
  const ampmScrollRef = useRef<ScrollView>(null);
  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);

  // 데이터 배열 생성
  const ampmList = ['am', 'pm'];
  const hours = Array.from({length: 12}, (_, i) => i + 1);
  const minutes = Array.from({length: 60}, (_, i) => i);

  // 초기 스크롤 위치 설정
  useEffect(() => {
    const setInitialPositions = () => {
      if (ampmScrollRef.current) {
        const ampmIndex = ampm === 'pm' ? 1 : 0;
        ampmScrollRef.current.scrollTo({
          y: ampmIndex * ITEM_HEIGHT,
          animated: false,
        });
        setSelectedAmPmIndex(ampmIndex);
      }

      hourScrollRef.current?.scrollTo({
        y: (hour - 1) * ITEM_HEIGHT,
        animated: false,
      });

      minuteScrollRef.current?.scrollTo({
        y: minute * ITEM_HEIGHT,
        animated: false,
      });
    };
    setTimeout(setInitialPositions, 100);
  }, []);

  useEffect(() => {
    const newHour = ampm === 'pm' ? (hour % 12) + 12 : hour % 12;
    const newDate = new Date(target?.timer || new Date());
    newDate.setHours(newHour);
    newDate.setMinutes(minute);
    updateFun({timer: newDate});
    console.log('설정된 시간 : ', newDate.getHours());
  }, [ampm, hour, minute]);

  const handleScroll = (
    event: any,
    type: 'hour' | 'minute' | 'ampm',
    setter: (value: any) => void,
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(y / ITEM_HEIGHT);

    switch (type) {
      case 'ampm':
        setSelectedAmPmIndex(selectedIndex);
        setter(ampmList[selectedIndex % 2]);
        break;
      case 'hour':
        setSelectedHourIndex(selectedIndex);
        setter(hours[selectedIndex] || 12);
        break;
      case 'minute':
        const minuteIndex = Math.min(Math.max(0, selectedIndex), 59);
        setSelectedMinuteIndex(minuteIndex);
        setter(minutes[minuteIndex] || 0);
        break;
    }
  };

  // 스크롤 종료 후 위치 보정
  const handleMomentumScrollEnd = (
    event: any,
    type: 'hour' | 'minute' | 'ampm',
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(y / ITEM_HEIGHT);

    if (type === 'minute') {
      // 분이 범위를 벗어나지 않도록 보정
      const safeMinute = Math.min(Math.max(0, selectedIndex), 59);

      if (Platform.OS === 'android') {
        // 안드로이드에서 정확한 위치로 스크롤
        minuteScrollRef.current?.scrollTo({
          y: safeMinute * ITEM_HEIGHT,
          animated: true,
        });

        // 선택된 분 업데이트
        setSelectedMinuteIndex(safeMinute);
        setMinutes(safeMinute);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        {/* AM/PM Picker */}
        <ScrollView
          ref={ampmScrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          onScroll={e => handleScroll(e, 'ampm', setAmpm)}
          scrollEventThrottle={16}
          style={styles.ampmScroll}>
          <View style={styles.spacer} />
          {ampmList.map((value, index) => (
            <View key={value} style={styles.itemContainer}>
              <Text
                style={[
                  styles.numberText,
                  selectedAmPmIndex % 2 === index && styles.activeNumberText,
                ]}>
                {value === 'am' ? '오전' : '오후'}
              </Text>
            </View>
          ))}
          <View style={styles.spacer} />
        </ScrollView>

        {/* Hour Picker */}
        <ScrollView
          ref={hourScrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          onScroll={e => handleScroll(e, 'hour', setHour)}
          scrollEventThrottle={16}
          style={styles.hourScroll}>
          <View style={styles.spacer} />
          {hours.map((h, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text
                style={[
                  styles.numberText,
                  selectedHourIndex === index && styles.activeNumberText,
                ]}>
                {h.toString().padStart(2, '0')}
              </Text>
            </View>
          ))}
          <View style={styles.spacer} />
        </ScrollView>

        <Text style={styles.separator}>:</Text>

        {/* Minute Picker */}
        <ScrollView
          ref={minuteScrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          onScroll={e => handleScroll(e, 'minute', setMinutes)}
          scrollEventThrottle={16}
          onMomentumScrollEnd={e => handleMomentumScrollEnd(e, 'minute')}
          decelerationRate={Platform.OS === 'android' ? 'normal' : 'fast'}
          style={styles.minuteScroll}>
          <View style={styles.spacer} />
          {minutes.map((m, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text
                style={[
                  styles.numberText,
                  selectedMinuteIndex === index && styles.activeNumberText,
                ]}>
                {m.toString().padStart(2, '0')}
              </Text>
            </View>
          ))}
          <View style={styles.spacer} />
        </ScrollView>
      </View>

      {/* 구분선 */}
      <View style={[styles.separatorLine, styles.topSeparator]} />
      <View style={[styles.separatorLine, styles.bottomSeparator]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    position: 'relative',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  ampmScroll: {
    width: 40,
  },
  hourScroll: {
    width: 50,
  },
  minuteScroll: {
    width: 50,
  },
  spacer: {
    height: ITEM_HEIGHT,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 20,
    color: '#C7C7C7',
    fontFamily: 'Pretendard-SemiBold',
  },
  activeNumberText: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: '#000000',
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 8,
    color: '#333',
  },
  separatorLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  topSeparator: {
    top: ITEM_HEIGHT,
  },
  bottomSeparator: {
    bottom: ITEM_HEIGHT,
  },
});

export default CustomTimePicker;
