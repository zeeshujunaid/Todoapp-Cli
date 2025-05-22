import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/Appnavigator';


export default function App() {
  return (
    // navigation container from react native
    <NavigationContainer>
        <AppNavigator />
    </NavigationContainer>
  );
}