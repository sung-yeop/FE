import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import ReportSelector from '../components/ReportPageComponents/ReportSelector';
import ReportDetailAnalyisis from '../components/ReportPageComponents/ReportDetailAnalyisis';
import ReportSelectMission from '../components/ReportPageComponents/ReportSelectMission';
import {AlarmImg} from '../../asset/images';
import {useReportManager} from '../hooks/useReportManager';
import ReportBtn from '../components/ReportPageComponents/ReportBtn';
import {theme} from '../style/Theme';
import {ReportAPI} from '../api/ReportAPI';
import {Parser} from '../util/Parser';
import ReportChart from './ReportChart';
import {MissionParser} from '../util/MissionParser';
// import LoadingSpinner from '../components/LoadingSpinner'; // 로딩 컴포넌트 필요

export type Verification = {
  alarmId: number;
  result: boolean;
  userId: number;
  value: number;
  verificationDateTime: string;
  verificationId: number;
};

type Props = {
  averageValue: number;
  successRatio: number;
  verifications: Verification[];
};

export type Food = {
  foodName: string;
  carbohydrates: number;
  protein: number;
  fat: number;
  sodium: number;
};

type VerificationResponseDTO = {
  verificationId: number;
  alarmId: number;
  userId: number;
  verificationDateTime: string;
  value: number;
  result: boolean;
};

export type NutrientData = {
  carbohydrates_percent: number;
  fat_percent: number;
  protein_percent: number;
  sodium_percent: number;
};

type FoodApiResponse = {
  foodAverages: NutrientData[];
  nutrientVerificationResponseDTOS: {
    foods: Food[];
    verificationResponseDTO: VerificationResponseDTO;
  }[];
};

const ReportPage = () => {
  const [isSelectMission, setIsSelectMission] = useState<boolean>(false);
  const [isSelectPeriods, setIsSelectPeriods] = useState<boolean>(false);
  const [isClickReportBtn, setIsClickReportBtn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<
    {
      label: string;
      value: number;
    }[]
  >();
  const {current} = useReportManager();
  const [duration, setDuration] = useState({
    startDate: '',
    endDate: '',
  });

  const [responseFromAPI, setResponseFromAPI] = useState<
    Props | FoodApiResponse
  >();

  useEffect(() => {
    console.log('ReportPage | current.duration : ', current.duration);
  }, [current]);

  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const slideUpAnim = useRef(new Animated.Value(0)).current;
  const resetAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (current.mission) {
      setIsSelectMission(true);
    }
    if (current.duration) {
      setIsSelectPeriods(true);
    }
  }, [current]);

  // 첫 번째 컴포넌트 페이드인
  useEffect(() => {
    Animated.timing(fadeAnim1, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  // 미션 선택 시 두 번째 컴포넌트 페이드인
  useEffect(() => {
    if (isSelectMission) {
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSelectMission]);

  // 기간 선택 시 세 번째 컴포넌트 페이드인
  useEffect(() => {
    if (isSelectPeriods) {
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [isSelectPeriods]);

  // 데이터 로딩 후 결과 컴포넌트 슬라이드업
  const handleAnalysis = async () => {
    Animated.timing(slideUpAnim, {
      toValue: -100,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setIsClickReportBtn(true);
      setIsLoading(true);
    });

    if (duration.startDate && duration.endDate && current.mission) {
      let response;
      if (current.mission === 'Eat food') {
        response = await ReportAPI.getFoodReport(new Date().toISOString());
      } else {
        response = await ReportAPI.getReport({
          missionName: current.mission,
          startDate: duration.startDate,
          endDate: duration.endDate,
        });
      }

      setResponseFromAPI(response);

      console.log('API 호출 결과 : ', response);

      if ('verifications' in response) {
        const result = Parser.parseChartFormFromAPI(response.verifications);
        setData(result);
      }
    } else {
      console.log(
        'ReportPage | 분석하기 버튼 클릭 - missionName : ',
        current.mission,
      );
      console.log(
        'ReportPage | 분석하기 버튼 클릭 - startDate : ',
        duration.startDate,
      );
      console.log(
        'ReportPage | 분석하기 버튼 클릭 - startDate : ',
        duration.endDate,
      );
      throw new Error(
        "ReportPage | 분석하기 버튼 클릭 : '미션' 또는 '기간'이 선택되지 않았습니다.",
      );
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    // 현재 컴포넌트들 위로 사라지는 애니메이션
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(resetAnim, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 첫 번째 애니메이션이 완료된 후
      // 상태 초기화
      setIsClickReportBtn(false);
      setIsSelectMission(false);
      setIsSelectPeriods(false);

      // 애니메이션 값 초기화
      slideAnim.setValue(50);
      slideUpAnim.setValue(0);
      fadeAnim1.setValue(0);
      fadeAnim2.setValue(0);
      fadeAnim3.setValue(0);
      resetAnim.setValue(50);

      // 첫 번째 컴포넌트 페이드인 시작
      setTimeout(() => {
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }).start();
      }, 100); // 약간의 딜레이 추가
    });
  };

  useEffect(() => {
    if (current.duration) {
      const {startDate, endDate} = Parser.parseReportDurationForm(
        current.duration,
      );
      setDuration({
        startDate: startDate,
        endDate: endDate,
      });
    }
  }, [current]);

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text={'간단 분석'} img={AlarmImg} />
      <ScrollView style={styles.content}>
        <View style={styles.ViewContent}>
          {!isClickReportBtn && (
            <Animated.View
              style={{
                transform: [{translateY: slideUpAnim}],
                opacity: slideUpAnim.interpolate({
                  inputRange: [-100, -50, 0],
                  outputRange: [0, 0.5, 1],
                  extrapolate: 'clamp',
                }),
              }}>
              <View style={styles.ViewContent}>
                <Animated.View style={{opacity: fadeAnim1}}>
                  <ReportSelectMission />
                </Animated.View>

                {isSelectMission && (
                  <Animated.View style={{opacity: fadeAnim2}}>
                    <ReportSelector />
                  </Animated.View>
                )}

                {isSelectMission && isSelectPeriods && (
                  <Animated.View style={{opacity: fadeAnim3}}>
                    <ReportBtn onPress={handleAnalysis} />
                  </Animated.View>
                )}
              </View>
            </Animated.View>
          )}

          {isSelectPeriods && isClickReportBtn && !isLoading && (
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: Animated.add(
                      slideAnim,
                      resetAnim.interpolate({
                        inputRange: [-100, 50],
                        outputRange: [-50, 0],
                      }),
                    ),
                  },
                ],
                opacity: slideAnim.interpolate({
                  inputRange: [-100, 0, 50],
                  outputRange: [0, 1, 0],
                  extrapolate: 'clamp',
                }),
              }}>
              <View style={styles.ViewContent}>
                <Text style={[theme.typography.h2, {textAlign: 'center'}]}>
                  {MissionParser.parseMissionName(current.mission)}
                </Text>
                {responseFromAPI !== undefined &&
                  'verifications' in responseFromAPI && (
                    <ReportChart
                      data={data}
                      averageValue={responseFromAPI.averageValue}
                    />
                  )}
                <ReportDetailAnalyisis
                  successRatio={
                    responseFromAPI !== undefined &&
                    'verifications' in responseFromAPI
                      ? responseFromAPI.successRatio
                      : responseFromAPI?.nutrientVerificationResponseDTOS[0]
                          .verificationResponseDTO.result
                      ? 1
                      : undefined
                  }
                  foods={
                    responseFromAPI !== undefined &&
                    'nutrientVerificationResponseDTOS' in responseFromAPI
                      ? responseFromAPI.nutrientVerificationResponseDTOS[0]
                          .foods
                      : undefined
                  }
                  nutrientData={
                    responseFromAPI !== undefined &&
                    'foodAverages' in responseFromAPI
                      ? responseFromAPI.foodAverages[0]
                      : undefined
                  }
                />
              </View>
              <TouchableOpacity
                style={theme.buttonContainerStyle}
                onPress={handleReset}>
                <Text style={theme.buttonTextStyle}>다시 하기</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportPage;

const styles = StyleSheet.create({
  // 컨테이너 스타일
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  ViewContent: {
    flex: 1,
    gap: 16,
  },

  // 미션 선택 박스
  missionBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  missionIcon: {
    width: 32,
    height: 32,
  },
  missionText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#333',
  },
  missionSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  // 시간 선택 버튼
  periodButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  periodText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Pretendard-Medium',
  },

  // 분석 버튼
  analyzeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  analyzeText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});
