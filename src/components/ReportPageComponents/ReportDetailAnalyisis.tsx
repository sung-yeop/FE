import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Food, NutrientData} from '../../screens/ReportPage';

type Props = {
  successRatio?: number;
  foods?: Food[];
  nutrientData?: NutrientData;
};

const ReportDetailAnalyisis = ({successRatio, foods, nutrientData}: Props) => {
  const getMessage = (ratio: number) => {
    if (ratio >= 0.8) return '놀라운 성과예요! 잘 유지하고 계시네요 💪';
    if (ratio >= 0.5) return '꾸준히 달성하고 계시네요! 앞으로도 파이팅 💪';
    if (ratio >= 0.3) return '점점 나아지고 있어요! 조금만 더 힘내세요 😊';
    return '천천히 시작해보세요! 작은 실천이 큰 변화를 만들어요 ✨';
  };

  const getNutrientStatus = (percent: number) => {
    if (percent >= 1.5)
      return {
        message: '섭취량이 너무 많아요! 조절이 필요해요 🚨',
        color: '#FF3B30',
        bgColor: '#FFF5F5',
      };
    if (percent >= 1.2)
      return {
        message: '섭취량이 약간 많네요! 주의가 필요해요 ⚠️',
        color: '#FF9500',
        bgColor: '#FFF9F0',
      };
    if (percent >= 0.8)
      return {
        message: '영양소 섭취를 잘 하고 계세요! 👏',
        color: '#34C759',
        bgColor: '#F2FBF4',
      };
    return {
      message: '조금 더 섭취하면 좋을 것 같아요 💪',
      color: '#007AFF',
      bgColor: '#F0F7FF',
    };
  };

  const isFoodMission = foods !== undefined ? true : false;

  return !isFoodMission && successRatio !== undefined ? (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.smallTitle}>지난 미션 성공률</Text>
        <View style={styles.percentageContainer}>
          <Text style={styles.percentage}>
            {`${(successRatio * 100).toFixed(1)}%`}
          </Text>
          <Text style={styles.percentageLabel}>달성</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>{getMessage(successRatio)}</Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.smallTitle}>오늘의 영양 섭취 현황</Text>
        <View style={styles.nutritionGrid}>
          {Object.entries({
            탄수화물: nutrientData?.carbohydrates_percent,
            단백질: nutrientData?.protein_percent,
            지방: nutrientData?.fat_percent,
            나트륨: nutrientData?.sodium_percent,
          }).map(([name, value]) => {
            const percent = value || 0;
            const status = getNutrientStatus(percent);

            return (
              <View
                key={name}
                style={[styles.gridItem, {backgroundColor: status.bgColor}]}>
                <Text style={[styles.statNumber, {color: status.color}]}>
                  {(percent * 100).toFixed(1)}%
                </Text>
                <Text style={styles.statLabel}>{name}</Text>
                <Text style={[styles.statusText, {color: status.color}]}>
                  {status.message}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ReportDetailAnalyisis;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
    margin: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    width: '100%',
  },
  gridItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 0,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Pretendard-Bold',
    marginBottom: 6,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
  },

  content: {
    alignItems: 'center',
    gap: 20,
  },
  smallTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Pretendard-Bold',
    marginBottom: 16,
  },
  percentageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  percentage: {
    fontSize: 52,
    fontWeight: '800',
    color: '#2196F3',
    letterSpacing: -1,
  },
  percentageLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  infoText: {
    textAlign: 'center',
    lineHeight: 24,
    color: '#444',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});
