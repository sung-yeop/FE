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
import ReportChart from '../components/ReportPageComponents/ReportChart';
import ReportDetailAnalyisis from '../components/ReportPageComponents/ReportDetailAnalyisis';
import ReportSelectMission from '../components/ReportPageComponents/ReportSelectMission';
import {AlarmImg} from '../../asset/images';
import {useReportManager} from '../hooks/useReportManager';
import ReportBtn from '../components/ReportPageComponents/ReportBtn';
import {theme} from '../style/Theme';
import {ReportAPI} from '../api/ReportAPI';
import {Parser} from '../util/Parser';
// import LoadingSpinner from '../components/LoadingSpinner'; // 로딩 컴포넌트 필요

type Verification = {
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

const ReportPage = () => {
  const [isSelectMission, setIsSelectMission] = useState<boolean>(false);
  const [isSelectPeriods, setIsSelectPeriods] = useState<boolean>(false);
  const [isClickReportBtn, setIsClickReportBtn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<{
    labels: string[];
    datasets: {data: number[]; color: any; strokeWidth: number}[];
    legen: string[];
  }>();
  const {current} = useReportManager();
  const [duration, setDuration] = useState({
    startDate: '',
    endDate: '',
  });
  let responseFromAPI: any;

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
      responseFromAPI = await ReportAPI.getReport({
        missionName: current.mission,
        startDate: duration.startDate,
        endDate: duration.endDate,
      });

      console.log('API 호출 결과 : ', responseFromAPI);

      // 날짜 추출 (중복 X)
      const dates: string[] = Array.from(
        new Set(
          responseFromAPI.verifications.map((item: Verification) =>
            Parser.parseDateToYMD(new Date(item.verificationDateTime)),
          ),
        ),
      );

      type DateValueMap = {[key: string]: number};

      const filteredDataTable = dates.reduce<DateValueMap>((acc, date) => {
        acc[date] = 0;
        return acc;
      }, {});

      const parsedData = responseFromAPI.verifications.map(
        (item: Verification) => {
          return {
            ...item,
            verificationDateTime: Parser.parseDateToYMD(
              new Date(item.verificationDateTime + 'Z'),
            ),
          };
        },
      );

      // parsedData.forEach((element: any) => {
      //   filteredDataTable[element.verificationDateTime] =
      //     (filteredDataTable[element.verificationDateTime] + element.value) / 2;
      //   console.log('로그  :', filteredDataTable[element.verificationDateTime]);
      // });

      const valueSums: {[key: string]: {sum: number; count: number}} = {};

      parsedData.forEach((element: any) => {
        if (!valueSums[element.verificationDateTime]) {
          valueSums[element.verificationDateTime] = {sum: 0, count: 0};
        }
        valueSums[element.verificationDateTime].sum += element.value;
        valueSums[element.verificationDateTime].count += 1;
      });

      // 평균 계산
      for (const date in filteredDataTable) {
        if (valueSums[date]) {
          filteredDataTable[date] = valueSums[date].sum / valueSums[date].count;
        }
      }

      const labels = Object.keys(filteredDataTable);
      const datas = Object.values(filteredDataTable);

      console.log('평균값 : ', responseFromAPI.averageValue);
      console.log('평균값 : ', responseFromAPI.successRatio);

      setData({
        labels: labels,
        datasets: [
          {
            data: datas,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
          },
          responseFromAPI.averageValue && {
            data: responseFromAPI.averageValue,
            color: (opacity = 1) => `rgba(255, 99, 99, ${opacity * 0.8})`, // 연한 빨간색
            strokeWidth: 1,
            withDots: false,
          },
        ],
        legen: ['Rainy Days'],
      });
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
                <ReportChart data={data} />
                <ReportDetailAnalyisis />
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 12,
  },
  ViewContent: {
    flex: 1,
    gap: 15,
  },
  resetButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
  },
});
