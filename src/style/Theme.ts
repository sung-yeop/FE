import {colors} from '../style/Colors';

export const theme = {
  colors: colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 24,
      color: 'black',
    },
    h2: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 20,
      color: 'black',
    },
    h3: {
      fontFamily: 'Pretendard-Bold',
      fontSize: 18,
      color: 'black',
    },
    body1: {
      fontFamily: 'Pretendard-Regular',
      fontSize: 16,
      color: 'black',
    },
    body2: {
      fontSize: 14,
      color: 'black',
    },
  },
  shadows: {
    small: {
      shadowColor: colors.common.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
  buttonContainerStyle: {
    backgroundColor: colors.primary.main,
    padding: 12,
    borderRadius: 12,
    marginVertical: 12,
  },
  buttonTextStyle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    textAlign: 'center' as const,
    color: 'white',
  },
};
