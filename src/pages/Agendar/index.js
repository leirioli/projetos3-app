import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
// Importa as funções do nosso novo serviço
import { getOccupiedTimesForDate, createAppointment } from '../../services/appointmentService';

// Idealmente, isso viria do backend ou de um arquivo de configuração
const SERVICOS = [
  { id: '1', nome: 'Corte de cabelo' },
  { id: '2', nome: 'Manicure' },
  { id: '3', nome: 'Pedicure' },
  { id: '4', nome: 'Massagem' },
  { id: '5', nome: 'Pintura' }
];
const HORARIOS_DISPONIVEIS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

export default function Agendar() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false); // Loading para os horários
  const navigation = useNavigation();

  // Função para quando um dia é pressionado no calendário
  const onDayPress = async (day) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    setSelectedService(null); // Reseta o serviço ao mudar a data
    setLoadingTimes(true);
    try {
      const occupied = await getOccupiedTimesForDate(dateString);
      setHorariosOcupados(occupied);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar os horários para esta data.");
      setHorariosOcupados([]);
    } finally {
      setLoadingTimes(false);
    }
  };

  // Função para confirmar e criar o agendamento
  const handleAgendar = async (horario) => {
    if (!selectedService) {
      Alert.alert("Atenção", "Por favor, selecione um serviço antes de agendar.");
      return;
    }

    const appointmentData = {
      servico: selectedService.nome,
      data: selectedDate,
      horario: horario,
    };

    try {
      await createAppointment(appointmentData);
      Alert.alert("Sucesso!", `Seu agendamento foi confirmado para ${selectedDate} às ${horario}.`);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o agendamento. Tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Agendar Horário</Text>
        
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#8E51DC', disableTouchEvent: true }
          }}
          minDate={new Date().toISOString().split('T')[0]} // Não permite agendar no passado
          theme={{
            todayTextColor: '#8E51DC',
            arrowColor: '#8E51DC',
          }}
        />

        {selectedDate && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Escolha o serviço:</Text>
              <FlatList
                horizontal
                data={SERVICOS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.serviceItem, selectedService?.id === item.id && styles.serviceSelected]}
                    onPress={() => setSelectedService(item)}
                  >
                    <Text style={[styles.serviceText, selectedService?.id === item.id && styles.serviceTextSelected]}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Escolha o horário:</Text>
              {loadingTimes ? (
                <ActivityIndicator size="large" color="#8E51DC" style={{ marginTop: 20 }} />
              ) : (
                HORARIOS_DISPONIVEIS.map(horario => {
                  const isOcupado = horariosOcupados.includes(horario);
                  const isEnabled = !isOcupado && selectedService;
                  return (
                    <TouchableOpacity
                      key={horario}
                      style={[styles.horarioItem, !isEnabled && styles.horarioDisabled, isOcupado && styles.horarioOcupado]}
                      onPress={() => handleAgendar(horario)}
                      disabled={!isEnabled}
                    >
                      <Text style={[styles.horarioText, !isEnabled && styles.horarioTextDisabled]}>{horario}</Text>
                      {isOcupado && <Text style={styles.ocupadoText}>Ocupado</Text>}
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', margin: 20, textAlign: 'center', color: '#333' },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15, color: '#444' },
  serviceItem: { paddingVertical: 10, paddingHorizontal: 15, marginRight: 10, backgroundColor: '#f0f0f0', borderRadius: 20, borderWidth: 1, borderColor: '#ddd' },
  serviceSelected: { backgroundColor: '#8E51DC', borderColor: '#8E51DC' },
  serviceText: { color: '#333', fontWeight: '500' },
  serviceTextSelected: { color: '#fff' },
  horarioItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  horarioDisabled: { backgroundColor: '#f9f9f9' },
  horarioOcupado: { backgroundColor: '#fbebeb' },
  horarioText: { color: '#333', fontSize: 16, fontWeight: '500' },
  horarioTextDisabled: { color: '#aaa' },
  ocupadoText: { color: '#e74c3c', fontSize: 14, fontWeight: 'bold' }
});
