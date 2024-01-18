// SignalTriggering.js

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';

const sendSignalToVehicle = (signalType) => {
  // Initialize Firebase if not already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(/* your Firebase config */);
  }

  // Call a cloud function to send the signal to the vehicle
  const sendSignalFunction = firebase.functions().httpsCallable('sendSignalToVehicle');
  
  // Pass the signal type to the cloud function
  return sendSignalFunction({ signalType })
    .then((result) => {
      console.log('Signal sent successfully:', result.data);
      return result.data;
    })
    .catch((error) => {
      console.error('Error sending signal:', error);
      throw error;
    });
};

export { sendSignalToVehicle };
