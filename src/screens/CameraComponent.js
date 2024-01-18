// CameraComponent.js

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Gyroscope, Accelerometer } from 'expo-sensors';

const CameraComponent = ({ onSensorData }) => {
  const cameraRef = useRef(null);

  useEffect(() => {
    const gyroscopeObservable = Gyroscope.addListener(({ x, y, z }) => {
      // Process gyroscope data (angular velocity)
      onSensorData({ type: 'gyroscope', data: { x, y, z } });
    });

    const accelerometerObservable = Accelerometer.addListener(({ x, y, z }) => {
      // Process accelerometer data (linear acceleration)
      onSensorData({ type: 'accelerometer', data: { x, y, z } });
    });

    return () => {
      gyroscopeObservable.remove();
      accelerometerObservable.remove();
    };
  }, [onSensorData]);

  const handleCameraStream = async ({ onCameraReady }) => {
    // Perform any camera-related setup
    // Call onCameraReady when the camera is ready
    if (onCameraReady) {
      onCameraReady();
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onCameraReady={() => console.log('Camera is ready')}
        onMountError={(error) => console.error('Camera mount error:', error)}
        onBarCodeScanned={({ type, data }) => console.log(`Bar code scanned: ${data} of type ${type}`)}
        onFacesDetected={(faces) => console.log('Detected faces:', faces)}
        onTextRecognized={({ text }) => console.log('Recognized text:', text)}
        onPictureSaved={(photo) => console.log('Picture saved:', photo)}
        onRecordingStart={() => console.log('Recording started')}
        onRecordingEnd={() => console.log('Recording ended')}
        onFrameChange={handleCameraStream}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default CameraComponent;
