import * as AuthModel from "../models/AuthModel";
import { db } from "../models/firebaseConfig";
import { doc, setDoc, getDoc, getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";

// Nova função auxiliar para garantir que o perfil do Firestore exista
const ensureUserProfileExists = async (user) => {
  const userDocRef = doc(db, 'usuarios', user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    console.log("Perfil do usuário não encontrado. Criando novo perfil básico...");
    await setDoc(userDocRef, {
      nome: user.displayName || 'Usuário', // Usa o nome de exibição, se existir, senão usa 'Usuário'
      email: user.email,
      createdAt: new Date(),
    });
  }
};

export const loginUser = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await AuthModel.login(email, password);
    const user = userCredential.user;

    // Chama a função para garantir que o perfil exista no Firestore
    await ensureUserProfileExists(user);

    return user;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email, password, name) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Atualiza o perfil do usuário no Firebase Authentication com o nome
    await updateProfile(user, { displayName: name });

    // Salva os dados do usuário no Firestore
    await setDoc(doc(db, 'usuarios', user.uid), {
      nome: name,
      email: email,
      createdAt: new Date(),
      // Você pode adicionar outros campos aqui, como telefone, etc.
    });

    console.log("Usuário registrado e perfil salvo no Firestore com o nome:", name);
    return user; // Retorna o objeto do usuário, se necessário
  } catch (error) {
    console.error("Erro ao registrar usuário ou salvar perfil:", error);
    throw error; // Propaga o erro para a tela de cadastro
  }
};

export const logoutUser = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    console.log("Usuário deslogado com sucesso!");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
};