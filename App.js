import React, { useEffect } from "react";
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

import { testFirebaseConnection } from "./src/models/TestFirebase";

export default function App() {

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#8E84DD'} barStyle={'light-content'} />
      <Routes />
    </NavigationContainer>
  );
}