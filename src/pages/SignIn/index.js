import React, { useState } from 'react'

import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { loginUser } from "../../controllers/AuthController";


export default function SignIn() {

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(email, password); // chama Firebase
      // Após o login, navegue para a tela 'Usuario' dentro do 'MainTabs'
      navigation.replace('MainTabs', { screen: 'Usuario' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Login</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder='Digite seu e-mail...'
          style={styles.input}
          value={email} onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Digite sua senha...'
          style={styles.input}
          secureTextEntry value={password} onChangeText={setPassword}
        />

        {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>

      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8E84DD',
  },
  containerHeader: {
    flex: 1, // Ocupa a parte de cima
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 40,
    fontWeight: '900',
    color: 'black',
  },
  containerForm: {
    flex: 2, // Ocupa a parte de baixo, com mais espaço
    backgroundColor: '#EEEEEE',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    height: 50,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8E84DD',
    width: '100%',
    borderRadius: 15,
    paddingVertical: 15, // Usando padding para altura responsiva
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '900',
    color: 'black',
  },
  button2: {
    marginTop: 15,
    backgroundColor: '#CE6AE6',
    width: '100%',
    borderRadius: 15,
    paddingVertical: 15, // Usando padding para altura responsiva
    alignItems: 'center',
    justifyContent: 'center',
  },
});