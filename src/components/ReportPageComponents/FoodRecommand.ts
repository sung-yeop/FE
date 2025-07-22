import {NutrientData} from '../../screens/ReportPage';

export const getNutrientStatus = (percent: number) => {
  if (percent >= 1.5)
    return {
      message: '섭취량이 너무 많아요! 조절이 필요해요 🚨',
      color: '#d13259',
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

export const getStatusText = (percent: number) => {
  if (percent >= 1.5) return '높음';
  if (percent >= 1.2) return '주의';
  if (percent >= 0.8) return '정상';
  return '낮음';
};

export const getFoodRecommendation = (nutrientData?: NutrientData) => {
  if (!nutrientData) return null;

  const recommendations = [];

  // 단백질 관련 추천
  if (nutrientData.protein_percent < 0.8) {
    recommendations.push({
      nutrient: '단백질',
      foods: '달걀, 닭가슴살, 두부, 연어, 견과류',
      message:
        '부족한 단백질 보충을 위해 달걀이나 닭가슴살, 생선류를 섭취해보세요. 간식으로는 견과류가 좋아요.',
    });
  } else if (nutrientData.protein_percent >= 1.5) {
    recommendations.push({
      nutrient: '단백질',
      foods: '채소, 과일, 현미',
      message:
        '단백질 섭취가 높으니 채소와 과일 위주의 식단으로 균형을 맞춰보세요.',
    });
  }

  // 탄수화물 관련 추천
  if (nutrientData.carbohydrates_percent < 0.8) {
    recommendations.push({
      nutrient: '탄수화물',
      foods: '현미, 고구마, 귀리, 바나나',
      message:
        '건강한 탄수화물 섭취를 위해 정제되지 않은 통곡물이나 과일을 추천드려요.',
    });
  } else if (nutrientData.carbohydrates_percent >= 1.5) {
    recommendations.push({
      nutrient: '탄수화물',
      foods: '샐러드, 두부, 닭가슴살',
      message: '탄수화물 섭취가 높으니 단백질과 채소 위주의 식단을 추천드려요.',
    });
  }

  // 지방 관련 추천
  if (nutrientData.fat_percent < 0.8) {
    recommendations.push({
      nutrient: '지방',
      foods: '아보카도, 올리브유, 견과류, 연어',
      message: '건강한 지방 섭취를 위해 오메가3가 풍부한 식품을 추천드려요.',
    });
  } else if (nutrientData.fat_percent >= 1.5) {
    recommendations.push({
      nutrient: '지방',
      foods: '닭가슴살, 두부, 채소',
      message:
        '지방 섭취가 높으니 저지방 단백질과 채소 위주의 식단을 추천드려요.',
    });
  }

  // 나트륨 관련 추천
  if (nutrientData.sodium_percent < 0.8) {
    recommendations.push({
      nutrient: '나트륨',
      foods: '우유, 요구르트, 바나나, 시금치',
      message: '칼륨이 풍부한 식품을 통해 전해질 균형을 맞춰보세요.',
    });
  } else if (nutrientData.sodium_percent >= 1.5) {
    recommendations.push({
      nutrient: '나트륨',
      foods: '채소, 과일, 물',
      message:
        '나트륨 섭취가 높으니 신선한 채소와 과일을 먹고, 물을 충분히 섭취하세요.',
    });
  }

  return recommendations;
};
