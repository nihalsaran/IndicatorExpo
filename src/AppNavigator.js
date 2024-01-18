// AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '/Users/nihalsarandasduggirala/Desktop/DETD APP/IndicatorExpo/src/screens/HomeScreen.js';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
