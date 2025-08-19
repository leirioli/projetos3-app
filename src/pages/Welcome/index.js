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
      </View>

      <Animatable.Text delay={600} animation='fadeInUp' style={styles.title}>Seja bem vindo(a)!</Animatable.Text>

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
    backgroundColor: '#8E84DD',
  },

  containerLogo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8E84DD',
  },


  containerForm: {
    flex: 0.5,
    backgroundColor: '#8350F2',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingStart: '5%',
    paddingEnd: '5%',
  },

  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 350,
    alignSelf: 'center',
  },

  text: {
    marginTop: 45,
    fontSize: 24,
    textAlign: 'center',
    color: 'black'
  },

  button: {
    position: 'absolute',
    backgroundColor: '#8350F2',
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 3,
    paddingVertical: 16,
    width: '60%',
    alignSelf: 'center',
    bottom: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '900'
  }
})