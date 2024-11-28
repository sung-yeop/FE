import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../style/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import {userSelector} from '../../atoms';
import {TrophyImg} from '../../../asset/images';
import {MissionCareType} from '../../types';
import {MissionParser} from '../../util/MissionParser';
import Icon from 'react-native-vector-icons/MaterialIcons';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Bottom'>;

const {width} = Dimensions.get('window');

type SuccessPageProps = {
  missionName: MissionCareType;
};

const Success = ({route}: {route: {params: SuccessPageProps}}) => {
  const {missionName} = route.params;
  const navigation = useNavigation<NavigationProps>();
  const value = useRecoilValue(userSelector);
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  if (!value) {
    throw new Error('User is not found');
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(500),
        Animated.spring(bounceAnim, {
          toValue: 1,
          friction: 3,
          tension: 20,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });

    return () => {
      floatAnim.stopAnimation();
    };
  }, []);

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
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.subContainer, {opacity: fadeAnim}]}>
        <View style={styles.textContainer}>
          <View style={styles.headerContainer}>
            <Icon
              name="check-circle"
              size={60}
              color="#4CAF50" // 초록색
              style={styles.icon}
            />
            <Text style={theme.typography.h2}>
              {MissionParser.parseMissionName(missionName)}
            </Text>
          </View>

          <Text style={[theme.typography.h1, styles.title]}>
            {value.name}님{'\n'}인증이 완료되었습니다!
          </Text>
          <Text style={styles.subtitle}>축하합니다! 다음미션도 힘내봐요!</Text>
        </View>
        <View style={styles.imageContainer}>
          <Animated.View
            style={{
              transform: [
                {
                  scale: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
                {
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                  }),
                },
              ],
            }}>
            <Image source={TrophyImg} style={styles.img} />
          </Animated.View>
        </View>
      </Animated.View>
      <TouchableOpacity
        style={[theme.buttonContainerStyle, styles.button]}
        onPress={onClickBtn}>
        <Text style={theme.buttonTextStyle}>미션 완료</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40, // 하단 여백 추가
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50, // 여백 증가
  },
  headerContainer: {
    backgroundColor: '#F8F9FA', // 밝은 배경색 추가
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 32, // 하단 여백 추가
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 36,
    letterSpacing: -0.5, // 자간 조정
  },
  subtitle: {
    fontSize: 17,
    color: '#495057', // 색상 조정
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // 상단 여백 추가
  },
  img: {
    width: width * 0.55, // 크기 약간 조정
    height: width * 0.55,
  },
  button: {
    marginBottom: 40,
    borderRadius: 14, // 더 부드러운 모서리
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.5,
  },
  icon: {
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
});
