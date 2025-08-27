import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { db } from '../../models/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { logoutUser } from '../../controllers/AuthController';

export default function Usuario() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'usuarios', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("Nenhum dado de usuário encontrado!");
          setUserData(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      alert("Erro ao fazer logout. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Perfil do Usuário</Text>
        <Text>Nenhum dado de perfil encontrado. Por favor, complete seu cadastro.</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <View style={styles.userContainer}>
        <Image
          source={require('../../assets/user.png')}
          style={{
            width: 150, // Adicionei uma largura
            height: 150, // Adicionei uma altura
          }}
          resizeMode='contain'
        />
      </View>
      <View>
        <Text style={styles.text}>{userData.nome}</Text>
      </View>
      <View style={styles.divider} />
      <View>
        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.text2}>{userData.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    alignItems: 'center', // Centraliza a imagem
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  text2: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  logoutButton: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});