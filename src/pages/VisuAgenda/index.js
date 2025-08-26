import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../../models/firebaseConfig';

export default function VisuAgenda() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAgendamentos = async () => {
    try {
      const auth = getAuth();
      const firestore = getFirestore();
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(collection(firestore, "agendamentos_por_usuario"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const listaAgendamentos = [];
      querySnapshot.forEach((doc) => {
        listaAgendamentos.push({ id: doc.id, ...doc.data() });
      });

      setAgendamentos(listaAgendamentos);
    } catch (error) {
      console.error("Erro ao buscar agendamentos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAgendamentos();
    }, [])
  );

  const handleEdit = async (agendamentoId) => {
    const novoHorario = '17:00';

    if (novoHorario) {
      const agendamentoRef = doc(db, 'agendamentos_por_usuario', agendamentoId);
      try {
        await updateDoc(agendamentoRef, {
          horario: novoHorario,
          dataAtualizacao: new Date()
        });
        Alert.alert("Sucesso!", "Agendamento atualizado com sucesso.");
        fetchAgendamentos();
      } catch (error) {
        console.error("Erro ao atualizar agendamento:", error);
        Alert.alert("Erro", "Não foi possível atualizar o agendamento.");
      }
    }
  };

  // NOVA FUNÇÃO: handleExcluir
  const handleExcluir = async (agendamentoId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir este agendamento?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: async () => {
            const agendamentoRef = doc(db, 'agendamentos_por_usuario', agendamentoId);
            try {
              await deleteDoc(agendamentoRef);
              Alert.alert("Sucesso!", "Agendamento excluído com sucesso.");
              fetchAgendamentos(); // Recarrega a lista
            } catch (error) {
              console.error("Erro ao excluir agendamento:", error);
              Alert.alert("Erro", "Não foi possível excluir o agendamento.");
            }
          }
        }
      ]
    );
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={agendamentos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.servico}>{item.servico}</Text>
              <Text style={styles.detalhes}>Data: {item.data}</Text>
              <Text style={styles.detalhes}>Hora: {item.horario || 'Hora não informada'}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleExcluir(item.id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Você não tem agendamentos.</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  servico: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detalhes: {
    fontSize: 14,
    color: 'gray',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});