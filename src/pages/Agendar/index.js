import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { db } from '../../models/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


export default function Agendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#50cebb',
    },
  };


  const horariosDisponiveis = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

  const servicos = [
    { id: '1', nome: 'Corte de cabelo' },
    { id: '2', nome: 'Manicure' },
    { id: '3', nome: 'Pedicure' },
    { id: '4', nome: 'Massagem' },
    { id: '5', nome: 'Pintura' }
  ];

  const onDayPress = async (day) => {
    setSelectedDate(day.dateString);
    setSelectedService(null);

    const dayDocRef = doc(db, 'agendamentos', day.dateString);
    const dayDoc = await getDoc(dayDocRef);

    if (dayDoc.exists()) {
      const ocupados = Object.keys(dayDoc.data().horarios || {});
      setHorariosOcupados(ocupados);
    } else {
      setHorariosOcupados([]);
    }
  };

  const handleAgendar = async (horario) => {
    if (!selectedDate || !selectedService) {
      Alert.alert("Atenção", "Por favor, selecione a data e o serviço antes de agendar.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para fazer um agendamento.");
      return;
    }

    const agendamentoDocRef = doc(db, 'agendamentos', selectedDate);

    const novoAgendamento = {
      cliente: user.displayName || user.email,
      servico: selectedService.nome,
      createdAt: new Date()
    };

    try {
      await setDoc(agendamentoDocRef, {
        horarios: {
          [horario]: novoAgendamento
        }
      }, { merge: true });

      Alert.alert("Sucesso!", `Agendamento de ${novoAgendamento.cliente} para ${selectedDate} às ${horario} salvo com sucesso!`);
      onDayPress({ dateString: selectedDate });
    } catch (error) {
      console.error("Erro ao agendar:", error);
      Alert.alert("Erro", "Não foi possível salvar o agendamento. Tente novamente.");
    }
  };

  const renderServicos = () => (
    <View style={styles.servicesContainer}>
      <Text style={styles.sectionTitle}>Escolha o serviço:</Text>
      <FlatList
        horizontal
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.serviceItem,
              selectedService?.id === item.id && styles.serviceSelected
            ]}
            onPress={() => setSelectedService(item)}
          >
            <Text style={styles.serviceText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Agendamentos</Text>
      <Calendar 
      onDayPress={onDayPress} 
      markedDates={markedDates}
      />
      {renderServicos()}
      {selectedDate && <Text style={styles.horariosTitle}>Horários em {selectedDate}:</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={horariosDisponiveis}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          if (!selectedDate) {
            return null;
          }
          const isOcupado = horariosOcupados.includes(item);
          return (
            <TouchableOpacity
              style={[styles.horarioItem, isOcupado && styles.horarioOcupado]}
              onPress={() => handleAgendar(item)}
              disabled={isOcupado || !selectedService}
            >
              <Text style={styles.horarioText}>{item}</Text>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerContainer: { paddingBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  servicesContainer: { marginTop: 20 },
  serviceItem: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  serviceSelected: {
    backgroundColor: '#50cebb',
    borderColor: '#50cebb',
  },
  serviceText: { color: '#333' },
  horariosTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  horarioItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc', backgroundColor: '#f9f9f9' },
  horarioOcupado: { backgroundColor: '#ddd' },
  horarioText: { color: '#333' }
});
