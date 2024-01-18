// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CameraComponent from './CameraComponent';
import TurnSignalDisplay from './TurnSignalDisplay';
import { useNavigation } from '@react-navigation/native';
import { preprocessGyroscopeData, preprocessAccelerometerData, extractFeaturesFromSensorData } from './SensorDataProcessing';
import { createModel, makePrediction } from './MachineLearningModel';
import { sendSignalToVehicle } from './SignalTriggering';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Initialize the machine learning model
    const initializedModel = createModel();
    setModel(initializedModel);

    // Cleanup function
    return () => {
      // Dispose of the model to free up memory
      if (initializedModel) {
        initializedModel.dispose();
      }
    };
  }, []);

  const handleSensorData = (sensorData) => {
    // Preprocess sensor data
    const processedSensorData = {
      gyroscope: preprocessGyroscopeData(sensorData.gyroscope.x, sensorData.gyroscope.y, sensorData.gyroscope.z),
      accelerometer: preprocessAccelerometerData(sensorData.accelerometer.x, sensorData.accelerometer.y, sensorData.accelerometer.z),
    };

    // Extract features from sensor data
    const features = extractFeaturesFromSensorData(processedSensorData.gyroscope, processedSensorData.accelerometer);

    // Make prediction using the machine learning model
    const newPrediction = makePrediction(model, features);
    setPrediction(newPrediction);

    // Trigger signal based on the prediction (assuming 'left' or 'right')
    if (newPrediction === 'left' || newPrediction === 'right') {
      sendSignalToVehicle(newPrediction)
        .then(() => console.log('Signal triggered successfully'))
        .catch((error) => console.error('Error triggering signal:', error));
    }
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <CameraComponent onSensorData={handleSensorData} />
      <TurnSignalDisplay prediction={prediction} />
      <Button title="Go to Settings" onPress={navigateToSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
