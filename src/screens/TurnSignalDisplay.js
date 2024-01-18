// TurnSignalDisplay.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TurnSignalDisplay = ({ prediction }) => {
  const getSignalText = () => {
    switch (prediction) {
      case 'left':
        return 'Left Turn Signal';
      case 'right':
        return 'Right Turn Signal';
      default:
        return 'No Turn Signal';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signalText}>{getSignalText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TurnSignalDisplay;
