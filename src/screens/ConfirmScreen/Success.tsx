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
          <Text>{MissionParser.parseMissionName(missionName)}</Text>
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
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: width * 0.6,
    height: width * 0.6,
  },
  button: {
    marginBottom: 40,
    elevation: 3, // Android 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
