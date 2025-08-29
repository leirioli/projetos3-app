import { doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { db } from '../../src/models/firebaseConfig';

/**
 * Escuta as atualizações do perfil do usuário em tempo real.
 * @param {function} onDataChange - Callback para ser executado quando os dados do perfil mudam. Recebe o objeto de dados do usuário.
 * @param {function} onError - Callback para ser executado em caso de erro. Recebe o objeto de erro.
 * @returns {function} Uma função de 'unsubscribe' para parar de escutar as atualizações.
 */
export const listenToUserProfile = (onDataChange, onError) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    // Se não houver usuário, chama o callback com null e não faz nada.
    onDataChange(null);
    return () => {}; // Retorna uma função vazia para não quebrar o useEffect
  }

  const userDocRef = doc(db, 'usuarios', user.uid);

  // onSnapshot cria um listener em tempo real.
  // Ele será chamado imediatamente com os dados atuais e, depois,
  // toda vez que o documento 'usuarios/{user.uid}' for alterado.
  const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
    if (docSnap.exists()) {
      onDataChange(docSnap.data());
    } else {
      console.log("Nenhum dado de usuário encontrado no Firestore!");
      // Informa ao componente que não há dados, para que ele possa mostrar a mensagem apropriada.
      onDataChange(null);
    }
  }, (error) => {
    console.error("Erro ao escutar dados do usuário:", error);
    onError(error);
  });

  // Retorna a função 'unsubscribe'. O React a chamará automaticamente
  // quando o componente for desmontado, evitando vazamentos de memória.
  return unsubscribe;
};
