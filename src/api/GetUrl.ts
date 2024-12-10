import {Platform} from 'react-native';

const ANDROID_URL = 'http://10.0.2.2:8080';
const IOS_URL = 'http://192.168.35.211:8080';

export class GetURL {
  static get baseUrl() {
    if (__DEV__) {
      if (Platform.OS === 'android') {
        return ANDROID_URL;
      }
      return IOS_URL;
    }
    return 'https://port-0-allyojo-m4avbhaned33f8d4.sel4.cloudtype.app';
  }
}
