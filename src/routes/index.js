// src/routes/index.js

import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';

// Telas de Autenticação
import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

// Telas Principais
import Usuario from '../pages/Usuario';
import VisuServicos from '../pages/VisuServicos';
import Agendar from '../pages/Agendar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Usuario") {
                        iconName = "person";
                    } else if (route.name === "Serviços") {
                        iconName = "list";
                    } else if (route.name === "Agendar") {
                        iconName = "calendar";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#8E84DD",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen 
            name="Usuario" 
            component={Usuario} 
            options={{ headerShown: false }}
            />
            <Tab.Screen name="Serviços" component={VisuServicos} />
            <Tab.Screen name="Agendar" component={Agendar} />
        </Tab.Navigator>
    );
}

export default function Routes() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });
        
        return unsubscribe;
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    
    // Remova a tag <NavigationContainer> daqui
    return user ? <MainTabs /> : <AuthStack />;
}