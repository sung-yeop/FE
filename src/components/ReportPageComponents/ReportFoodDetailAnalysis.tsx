import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getFoodRecommendation,
  getNutrientStatus,
  getStatusText,
} from './FoodRecommand';
import {Food, NutrientData} from '../../screens/ReportPage';

type Props = {
  foods: Food[] | undefined;
  nutrientData: NutrientData | undefined;
};
const ReportFoodDetailAnalysis = ({foods, nutrientData}: Props) => {
  if (foods === undefined || nutrientData === undefined)
    return <Text>아직 오늘은 완료하신 미션이 없어요</Text>;
  return (
    <View style={styles.container}>
      <Text style={styles.smallTitle}>오늘의 영양 섭취 현황</Text>
      <View style={styles.statsContainer}>
        {Object.entries({
          탄수화물: nutrientData?.carbohydrates_percent,
          단백질: nutrientData?.protein_percent,
          지방: nutrientData?.fat_percent,
          나트륨: nutrientData?.sodium_percent,
        }).map(([name, value]) => {
          const percent = value || 0;
          const status = getNutrientStatus(percent);

          return (
            <View key={name} style={styles.statBox}>
              <Text style={styles.statName}>{name}</Text>
              <Text style={styles.statValue}>
                {(percent * 100).toFixed(1)}%
              </Text>
              <View style={styles.labelContainer}>
                <View
                  style={[styles.statusBadge, {backgroundColor: status.color}]}>
                  <Text style={styles.statusText}>
                    {getStatusText(percent)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {getFoodRecommendation(nutrientData)?.map((rec, index) => {
        const currentValue =
          nutrientData?.[
            `${rec.nutrient.toLowerCase()}_percent` as keyof NutrientData
          ] || 0;
        const status = getNutrientStatus(currentValue);

        return (
          <View key={index} style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Icon name="restaurant" size={20} color={status.color} />
              <Text style={styles.recommendationTitle}>
                {`${rec.nutrient} 영양소 균형을 위한 제안`}
              </Text>
            </View>
            <Text style={styles.recommendationText}>{rec.message}</Text>
            <View style={styles.foodTagsContainer}>
              {rec.foods.split(', ').map((food, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.foodTag,
                    {backgroundColor: `${status.color}15`},
                  ]}>
                  <Icon
                    name="fiber-manual-record"
                    size={8}
                    color={status.color}
                    style={styles.tagDot}
                  />
                  <Text style={[styles.foodTagText, {color: status.color}]}>
                    {food}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ReportFoodDetailAnalysis;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  smallTitle: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: 'gray',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statUnit: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Pretendard-Medium',
  },
  statName: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Pretendard-Bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 4,
    width: '100%',
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
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

  content: {
    alignItems: 'center',
    gap: 20,
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
  recommendationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  recommendationTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
  },
  recommendationText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  foodTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  foodTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagDot: {
    marginRight: 6,
  },
  foodTagText: {
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
  },
});
