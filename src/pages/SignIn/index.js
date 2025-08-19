import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';


export default function SignIn() {

  const navigation = useNavigation();

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
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Digite sua senha...'
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
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
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },

  message: {
    fontSize: 28,
    fontWeight: '900',
    alignSelf: 'center',
    marginRight: '5%',
  },

  containerForm: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },

  title: {
    fontSize: 20,
    marginTop: 25,
  },

  input: {
    borderWidth: 1,
    height: 40,
    marginBottom: 12,
    marginTop: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#8E84DD',
    width: '50%',
    height: 50,
    borderRadius: 15,
    paddingVertical: 8,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '900',
  },

  button2: {
    marginTop: 25,
    backgroundColor: '#CE6AE6',
    height: 50,
    width: '70%',
    borderRadius: 15,
    paddingVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})