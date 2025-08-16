import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.container}>

        <View style={styles.containerLogo}>
            <Image
            source={require('../../assets/icon-removebg-preview.png')}
            style={{ width: '100%', height: 250}}
            resizeMode="contain"
            />
        </View>

        <View style={styles.containerForm}>
            <Text style={styles.title}>Bem vindo(a)!</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#B86AD9',
    }
})