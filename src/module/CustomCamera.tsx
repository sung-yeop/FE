import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  // Alert된 알람을 넘겨받아서 처리해야함
};

type RootStackParamList = {
  PhotoConfirmPage: {
    imageUri: string;
    type?: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CustomCamera = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const navigation = useNavigation<NavigationProp>();

  const handleTakePhoto = useCallback(async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePhoto();
        setImageUri(`${photo.path}`);
      }
    } catch (error) {
      console.error('카메라 에러:', error);
    }
  }, [camera]);

  if (!device) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>카메라를 불러오는 중...</Text>
      </View>
    );
  }

  useEffect(() => {
    if (!imageUri) return;
    navigation.navigate('PhotoConfirmPage', {
      imageUri: imageUri,
    });
  }, [imageUri, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            미션에 맞는 사진을 촬영해주세요!
          </Text>
        </View>

        <Camera
          ref={camera}
          style={styles.cameraPreview}
          device={device}
          isActive={true}
          photo={true}
        />

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleTakePhoto}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // 어두운 배경으로 변경
  },
  cameraContainer: {
    flex: 1,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 반투명 배경
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#000',
  },
  controls: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingBottom: 20, // 안전 영역 고려
    paddingTop: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    // 새로 추가
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
