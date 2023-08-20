import React from 'react'
import { View, Text } from 'react-native'
import { Provider } from "react-redux"
import MyReducer from './Source/Data/Redux/MyReducer'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// -----------------------------------------
import SplashScreen from './Source/Screens/SplashScreen';
import TestingScreen from './Source/Screens/TestingScreen';
import HomeScreen from './Source/Screens/HomeScreen';
import AddPorductScreen from './Source/Screens/AddPorductScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={MyReducer}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          {/* <Stack.Screen name="TestingScreen" component={TestingScreen} /> */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AddPorductScreen" component={AddPorductScreen} />

        </Stack.Navigator>

      </NavigationContainer>
    </Provider>
  )
}
