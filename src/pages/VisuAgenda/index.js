import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
// Importa as funções do nosso novo serviço
import { fetchUserAppointments, deleteAppointment } from '../../services/appointmentService'; 

export default function VisuAgenda() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Para o "puxar para atualizar"

  // Função para buscar os dados usando o serviço
  const loadAgendamentos = async () => {
    try {
      const userAppointments = await fetchUserAppointments();
      setAgendamentos(userAppointments);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar seus agendamentos. Tente novamente.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // useFocusEffect para carregar os dados quando a tela é focada
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadAgendamentos();
    }, [])
  );

  // Função para o "puxar para atualizar"
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAgendamentos();
  }, []);

  // Função para lidar com a exclusão
  const handleExcluir = (agendamentoId, data, horario) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir este agendamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              // Chama a função de exclusão do serviço
              await deleteAppointment(agendamentoId, data, horario);
              Alert.alert("Sucesso!", "Agendamento excluído com sucesso.");
              // Atualiza a lista removendo o item excluído, sem precisar buscar tudo de novo
              setAgendamentos(prev => prev.filter(item => item.id !== agendamentoId));
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o agendamento.");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#8E51DC" />
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
              <Text style={styles.detalhes}>Hora: {item.horario}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleExcluir(item.id, item.data, item.horario)}
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>Você não tem agendamentos.</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#8E51DC"]} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 30,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  servico: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detalhes: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
