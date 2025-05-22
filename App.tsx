import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/Appnavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {ThemeProvider} from './Theme/themecontext'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
