import React, { useState } from 'react'

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { registerUser } from "../../controllers/AuthController";

export default function SignUp() {

    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        // 1. Teste o Alert. Se este alerta não aparecer, o problema é com a importação ou setup do Alert
        //Alert.alert("Teste de Alerta", "Este alerta deve aparecer na tela.");

        console.log("Botão 'Cadastrar' pressionado!");

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não conferem!");
            return;
        }

        if (!name || !email || !password) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }

        try {
            console.log("Tentando registrar usuário...");
            await registerUser(email, password, name);

            console.log("Usuário registrado com sucesso! Navegando...");
            Alert.alert("Sucesso!", "Cadastro realizado com sucesso.");
            navigation.replace("MainTabs");
        } catch (err) {
            console.log("Ocorreu um erro durante o registro.");
            // Loga o objeto de erro completo
            console.log(err);
            Alert.alert("Erro de Cadastro", err.message);
        }
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Cadastro</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>

                <Text style={styles.title}>Nome</Text>
                <TextInput
                    placeholder="Digite seu nome..."
                    style={styles.input}
                    value={name} onChangeText={setName}
                />


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

                <Text style={styles.title}>Confirme sua senha</Text>
                <TextInput
                    placeholder='Digite sua senha...'
                    style={styles.input}
                    secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={styles.buttonText}>Já tem uma conta? Faça o Login</Text>
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