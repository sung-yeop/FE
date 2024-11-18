import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../style/Theme';
import {Verification} from '../api/VerificationAPI';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type PhotoConfirmParams = {
  imageUri: string;
  username: string;
  alarmId: string;
  type?: string;
};

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Success',
  'Fail'
>;

const PhotoConfirmPage = ({route}: {route: {params: PhotoConfirmParams}}) => {
  const {imageUri, username, alarmId, type} = route.params;
  const navigation = useNavigation<NavigationProps>();

  const handleConfirm = async () => {
    try {
      // 로딩 상태 추가 가능
      // result = {guess : 1}이면 다시 인증이 필요하다는 페이지로 navigate
      // guess가 0이면 인증이 완료되었다는 페이지로 navigate
      const result = await Verification.verificationSend(imageUri);
      if (result.guess === 1) {
        // 알려줘 페이지에서 다시 인증을 진행해달라고 안내
        navigation.navigate('Fail');
        return;
      }
      console.log('Verification result:', result);
      navigation.navigate('Success');
      return;
    } catch (error) {
      console.error('Verification error:', error);
      // 에러 처리
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>미션 인증</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{uri: imageUri}}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.overlay} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.retakeButton]}
          onPress={() => navigation.goBack()}>
          <Icon name="camera-outline" size={20} color="#000" />
          <Text style={styles.retakeButtonText}>다시 찍기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.confirmButton]}
          onPress={handleConfirm}>
          <Icon
            name="checkmark-outline"
            size={20}
            color="#fff"
            style={{marginRight: 6}}
          />
          <Text style={theme.buttonTextStyle}>인증하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // 미묘한 오버레이 효과
  },
  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    width: '48%', // 약간의 간격을 위해 48%
  },
  retakeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  confirmButton: {
    backgroundColor: '#2cc295', // 미션 성공을 상징하는 그린 컬러
  },
  retakeButtonText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    marginLeft: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PhotoConfirmPage;
