import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation='flipInY'
          source={require('../../assets/icon.png')}
          style={{
            width: '70%',
          }}
          resizeMode='contain'
        />
        <Animatable.Text delay={600} animation='fadeInUp' style={styles.title}>Seja bem vindo(a)!</Animatable.Text>
      </View>

      <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
        <Text style={styles.text}>Faça o login ou cadastre-se</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8E84DD', // Cor de fundo principal mantida
  },
  containerLogo: {
    flex: 2, // Ocupa 2/3 da tela
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8E84DD', // Cor de fundo mantida
    paddingHorizontal: '5%',
  },
  containerForm: {
    flex: 1, // Ocupa 1/3 da tela
    backgroundColor: '#8350F2', // Cor do formulário mantida
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: '5%',
    justifyContent: 'space-around', // Distribui o espaço para o texto e o botão
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000', // Cor do título mantida (preto)
    textAlign: 'center',
    bottom: 40,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black', // Cor do texto mantida
  },
  button: {
    backgroundColor: '#8350F2', // Cor do botão mantida
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 15,
    paddingVertical: 15,
    width: '60%',
    alignItems: 'center',
        bottom: 40,
  },
  
  buttonText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000', // Cor do texto do botão mantida (preto)
  },
});