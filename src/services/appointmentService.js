import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  deleteField,
  addDoc,
  setDoc,
  Timestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../src/models/firebaseConfig';

/**
 * Busca os agendamentos de um usuário específico.
 * @returns {Promise<Array>} Uma lista de agendamentos.
 */
export const fetchUserAppointments = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("Nenhum usuário autenticado encontrado.");
    return []; // Retorna um array vazio se não houver usuário
  }

  try {
    const q = query(collection(db, "agendamentos_por_usuario"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    // Ordena os agendamentos por data e hora para melhor visualização
    return appointments.sort((a, b) => new Date(a.data) - new Date(b.data) || a.horario.localeCompare(b.horario));
  } catch (error) {
    console.error("Erro ao buscar agendamentos no serviço: ", error);
    throw error; // Propaga o erro para ser tratado no componente
  }
};

/**
 * Exclui um agendamento e libera o horário correspondente.
 * @param {string} appointmentId - O ID do agendamento a ser excluído.
 * @param {string} date - A data do agendamento (formato 'YYYY-MM-DD').
 * @param {string} time - O horário do agendamento (formato 'HH:MM').
 */
export const deleteAppointment = async (appointmentId, date, time) => {
  try {
    // 1. Excluir o agendamento do usuário
    const appointmentRef = doc(db, 'agendamentos_por_usuario', appointmentId);
    await deleteDoc(appointmentRef);
    console.log(`Documento ${appointmentId} excluído de agendamentos_por_usuario.`);

    // 2. Remover o horário da coleção 'horarios_agendados_por_dia'
    const dailyScheduleRef = doc(db, 'horarios_agendados_por_dia', date);
    const docSnap = await getDoc(dailyScheduleRef);

    if (docSnap.exists() && docSnap.data().horarios) {
      // Se houver apenas um horário agendado no dia (este que está sendo excluído),
      // remove o documento do dia inteiro para limpar o banco.
      if (Object.keys(docSnap.data().horarios).length === 1) {
        await deleteDoc(dailyScheduleRef);
        console.log(`Documento do dia ${date} excluído de horarios_agendados_por_dia.`);
      } else {
        // Caso contrário, atualiza o documento removendo apenas o campo do horário específico.
        await updateDoc(dailyScheduleRef, {
          [`horarios.${time}`]: deleteField()
        });
        console.log(`Horário ${time} removido do dia ${date}.`);
      }
    } else {
      console.log(`Nenhum documento encontrado para o dia ${date} em horarios_agendados_por_dia.`);
    }
  } catch (error) {
    console.error("Erro ao excluir agendamento no serviço: ", error);
    throw error;
  }
};

/**
 * Busca os horários ocupados para uma data específica.
 * @param {string} dateString - A data no formato 'YYYY-MM-DD'.
 * @returns {Promise<Array>} Uma lista de horários ocupados.
 */
export const getOccupiedTimesForDate = async (dateString) => {
  try {
    const dayDocRef = doc(db, 'horarios_agendados_por_dia', dateString);
    const dayDoc = await getDoc(dayDocRef);
    if (dayDoc.exists()) {
      return Object.keys(dayDoc.data().horarios || {});
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar horários ocupados no serviço: ", error);
    throw error;
  }
};

/**
 * Cria um novo agendamento no Firestore.
 * @param {object} appointmentData - Os dados do agendamento.
 */
export const createAppointment = async (appointmentData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  const newAppointment = {
    ...appointmentData,
    userId: user.uid,
    cliente: user.displayName || user.email,
    createdAt: Timestamp.now() // Usar Timestamp do Firebase
  };

  try {
    // 1. Adiciona na coleção de agendamentos do usuário
    const userAppointmentsRef = collection(db, 'agendamentos_por_usuario');
    await addDoc(userAppointmentsRef, newAppointment);

    // 2. Adiciona/Atualiza o horário na coleção de horários por dia
    const dailyScheduleRef = doc(db, 'horarios_agendados_por_dia', newAppointment.data);
    await setDoc(dailyScheduleRef, {
      horarios: {
        [newAppointment.horario]: newAppointment
      }
    }, { merge: true });

  } catch (error) {
    console.error("Erro ao criar agendamento no serviço: ", error);
    throw error;
  }
};
