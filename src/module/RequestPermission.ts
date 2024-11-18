// import {Platform} from 'react-native';
// import {
//   checkMultiple,
//   PERMISSIONS,
//   requestMultiple,
//   RESULTS,
// } from 'react-native-permissions';

// const requestCameraPermission = async (): Promise<boolean> => {
//   try {
//     const results = await requestMultiple([
//       Platform.OS === 'ios'
//         ? PERMISSIONS.IOS.CAMERA
//         : PERMISSIONS.ANDROID.CAMERA,
//     ]);

//     return (
//       results[
//         Platform.OS === 'ios'
//           ? PERMISSIONS.IOS.CAMERA
//           : PERMISSIONS.ANDROID.CAMERA
//       ] === RESULTS.GRANTED
//     );
//   } catch (error) {
//     console.error(error);
//     return false; // 예외 발생 시 false 반환
//   }
// };

// export const checkCameraPermission = async (): Promise<boolean> => {
//   const results = await checkMultiple([
//     Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
//   ]);

//   if (
//     results[
//       Platform.OS === 'ios'
//         ? PERMISSIONS.IOS.CAMERA
//         : PERMISSIONS.ANDROID.CAMERA
//     ] === RESULTS.GRANTED
//   ) {
//     return true;
//   } else {
//     return await requestCameraPermission();
//   }
// };

import {Platform, Alert} from 'react-native';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    const result = await requestMultiple([permission]);

    if (result[permission] === RESULTS.DENIED) {
      Alert.alert('카메라 권한', '카메라 사용을 위해 권한이 필요합니다.', [
        {text: '취소', style: 'cancel'},
        {text: '설정', onPress: () => openSettings()},
      ]);
      return false;
    }

    return result[permission] === RESULTS.GRANTED;
  } catch (error) {
    console.error('Camera permission request error:', error);
    return false;
  }
};

export const checkCameraPermission = async (): Promise<boolean> => {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    const results = await checkMultiple([permission]);

    console.log('Permission check result:', results[permission]);

    if (results[permission] === RESULTS.GRANTED) {
      return true;
    }

    return await requestCameraPermission();
  } catch (error) {
    console.error('Check camera permission error:', error);
    return false;
  }
};
