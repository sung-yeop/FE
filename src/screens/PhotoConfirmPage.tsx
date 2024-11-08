import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ConfirmButton from '../components/PhotoConfirmPageComponents/ConfirmButton';

type PhotoConfirmParams = {
  imageUri: string;
  type?: string;
};

const PhotoConfirmPage = ({route}: {route: {params: PhotoConfirmParams}}) => {
  const {imageUri, type} = route.params;
  const navigation = useNavigation();
  console.log('Image URI:', imageUri);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{uri: imageUri}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.footer}>
        <ConfirmButton func={() => navigation.goBack()} title={'다시 찍기'} />
        <ConfirmButton func={() => {}} title="인증하기" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  imageContainer: {
    flex: 1, // 남은 공간 모두 차지
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PhotoConfirmPage;
