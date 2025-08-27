import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { logoutUser } from '../../controllers/AuthController';
// Importa a nova função do serviço de usuário
import { listenToUserProfile } from '../../services/userService';

// Um ícone simples para o botão, caso não tenha uma biblioteca de ícones
const LogoutIcon = () => <Text style={{ color: 'white', marginRight: 10 }}>⇥</Text>;

export default function Usuario() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicia o listener para o perfil do usuário
    const unsubscribe = listenToUserProfile(
      (profileData) => {
        setUserData(profileData);
        setLoading(false);
      },
      (error) => {
        Alert.alert("Erro", "Não foi possível carregar os dados do seu perfil.");
        setLoading(false);
      }
    );

    // A função de limpeza do useEffect chamará o 'unsubscribe'
    // quando o componente for desmontado.
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirmar Saída",
      "Tem certeza de que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await logoutUser();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível fazer logout. Tente novamente.");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#8E51DC" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={require('../../assets/user.png')}
          style={styles.avatar}
        />
        {userData ? (
          <>
            <Text style={styles.userName}>{userData.nome}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </>
        ) : (
          <Text style={styles.noDataText}>Perfil não encontrado.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginTop: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#8E51DC',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
