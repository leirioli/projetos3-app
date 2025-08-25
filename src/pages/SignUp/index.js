import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from "../../controllers/AuthController"; // Assume que registerUser foi atualizado

export default function SignUp() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false); // Adicione o estado de carregamento

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não conferem!");
            return;
        }

        if (!name || !email || !password) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true); // Inicia o carregamento
        try {
            console.log("Tentando registrar usuário...");
            // Passe o 'name' para a função registerUser
            await registerUser(email, password, name); 

            console.log("Usuário registrado com sucesso! Navegando...");
            Alert.alert("Sucesso!", "Cadastro realizado com sucesso.");
            navigation.navigate('SignIn'); // Navega para a tela de login após o sucesso
        } catch (err) {
            console.log("Ocorreu um erro durante o registro.");
            console.log(err);
            Alert.alert("Erro de Cadastro", err.message);
        } finally {
            setLoading(false); // Finaliza o carregamento
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
                    keyboardType="email-address" // Adicione o tipo de teclado para e-mail
                    autoCapitalize="none" // Desativa a capitalização automática
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

                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" /> // Mostra um indicador de carregamento
                    ) : (
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    )}
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
        borderColor: '#ccc', // Adicione uma cor de borda
        height: 40,
        marginBottom: 12,
        marginTop: 12,
        fontSize: 16,
        paddingHorizontal: 10, // Adicione padding horizontal
        borderRadius: 5, // Adicione borda arredondada
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
        color: '#fff', // Cor do texto para ser visível
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
});