import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashscreen';
import HomeScreen from '../screens/Homescreen';
import Addtodo from '../screens/Addtodo';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Loader'>
        <Stack.Screen name="Loader" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Addtodo" component={Addtodo} />
    </Stack.Navigator>
  );
};

export default AppNavigator;