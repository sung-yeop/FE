import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
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
        <Text>카메라를 불러오는 중...</Text>
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
          <TouchableOpacity onPress={() => {}} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>미션에 맞는 사진을 찍어주세요!</Text>
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
    backgroundColor: '#fff',
  },
  cameraContainer: {
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  guideText: {
    fontSize: 16,
    color: '#666',
  },
  controls: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#000',
  },
  previewContainer: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  retakeButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
