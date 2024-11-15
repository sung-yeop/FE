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
// import LoadingSpinner from '../components/LoadingSpinner'; // 로딩 컴포넌트 필요

const ReportPage = () => {
  const [isSelectMission, setIsSelectMission] = useState<boolean>(false);
  const [isSelectPeriods, setIsSelectPeriods] = useState<boolean>(false);
  const [isClickReportBtn, setIsClickReportBtn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {current} = useReportManager();

  // 애니메이션 값들
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current; // 아래에서 위로 올라오는 효과
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
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 800,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setIsClickReportBtn(false);
      setIsSelectMission(false);
      setIsSelectPeriods(false);

      slideAnim.setValue(50);
      slideUpAnim.setValue(0);
      fadeAnim1.setValue(0);
      fadeAnim2.setValue(0);
      fadeAnim3.setValue(0);

      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, 800);
  };

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
                transform: [{translateY: slideAnim}],
                opacity: slideAnim.interpolate({
                  inputRange: [0, 50],
                  outputRange: [1, 0],
                }),
              }}>
              <View style={styles.ViewContent}>
                <ReportDetailAnalyisis />
                <ReportChart />
                <Animated.View
                  style={{
                    transform: [{translateY: resetAnim}],
                    opacity: resetAnim.interpolate({
                      inputRange: [0, 50],
                      outputRange: [1, 0],
                    }),
                  }}></Animated.View>
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
