import { auth } from "./firebaseConfig";

export const testFirebaseConnection = () => {
  if (auth) {
    console.log("Firebase inicializado com sucesso!");
  } else {
    console.log("Erro ao inicializar o Firebase.");
  }
};