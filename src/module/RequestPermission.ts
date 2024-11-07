import {Platform} from 'react-native';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const results = await requestMultiple([
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ]);

    return (
      results[
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA
      ] === RESULTS.GRANTED
    );
  } catch (error) {
    console.error(error);
    return false; // 예외 발생 시 false 반환
  }
};

export const checkCameraPermission = async (): Promise<boolean> => {
  const results = await checkMultiple([
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  ]);

  if (
    results[
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    ] === RESULTS.GRANTED
  ) {
    return true;
  } else {
    return await requestCameraPermission();
  }
};
