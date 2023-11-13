/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar, StyleSheet} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {PublicStack} from '~navigation/types';
import SplashScreen from '~modules/splash/SplashScreen';
import SplashScreenNext from '~modules/splash/SplashScreenNext';
import StationScreen from '~modules/station/StationScreen';
import HomeScreen from '~modules/home/HomeScreen';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

function App(): JSX.Element {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <NavigationContainer theme={navTheme}>
          <PublicStack.Navigator
            initialRouteName="splash"
            screenOptions={{
              headerShown: false,
            }}>
            <PublicStack.Screen component={SplashScreen} name="splash" />
            <PublicStack.Screen
              component={SplashScreenNext}
              name="splash_next"
            />
            <PublicStack.Screen component={HomeScreen} name="home" />
            <PublicStack.Screen
              component={StationScreen}
              name="stationScreen"
            />
          </PublicStack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
