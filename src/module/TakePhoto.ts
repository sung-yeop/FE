import {launchCamera} from 'react-native-image-picker';
import {checkCameraPermission} from './RequestPermission';
import {openSettings} from 'react-native-permissions';
import {Alert} from 'react-native';

export const takePhoto = async ({navigation, route}: any) => {
  const granted = await checkCameraPermission();

  if (granted) {
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        cameraType: 'back',
        includeBase64: false,
      });

      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      const asset = response?.assets?.[0];
      if (asset?.uri) {
        navigation.navigate('AlarmPage', {
          type: route.params.type,
          uri: asset.uri,
        });
      }
    } catch (error) {
      Alert.alert('Error', '카메라 실행 중 오류가 발생했습니다.');
    }
  } else {
    Alert.alert(
      '접근 권한 에러',
      '현재 카메라 사용에 대한 접근 권한이 없습니다. 접근 권한을 허용해 주세요.',
      [
        {
          text: '확인',
          onPress: () => openSettings(),
        },
      ],
    );
  }
};
