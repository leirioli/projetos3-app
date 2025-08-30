import React, { useEffect } from "react";
import { StatusBar, AppState } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

import { testFirebaseConnection } from "./src/models/TestFirebase";

const STATUS_BAR_COLOR = '#8E84DD';
const STATUS_BAR_STYLE = 'light-content';

export default function App() {

  useEffect(() => {
    testFirebaseConnection();

    // 2. Crie uma função para lidar com a mudança de estado do app
    const handleAppStateChange = (nextAppState) => {
      // Se o app ficou ativo (voltou do segundo plano)
      if (nextAppState === 'active') {
        console.log("App voltou para o primeiro plano, reconfigurando StatusBar.");
        // 3. Força a reconfiguração da StatusBar de forma imperativa.
        // Isso garante que o estilo seja aplicado imediatamente.
        StatusBar.setBackgroundColor(STATUS_BAR_COLOR);
        StatusBar.setBarStyle(STATUS_BAR_STYLE);
      }
    };

    // 4. Adiciona o "ouvinte" de eventos do AppState
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // 5. Limpa o "ouvinte" quando o componente for desmontado para evitar vazamentos de memória
    return () => {
      subscription.remove();
    };

  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={STATUS_BAR_COLOR} barStyle={STATUS_BAR_STYLE} />
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}