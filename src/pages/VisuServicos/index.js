import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function VisuServicos() {
  return (
    <ScrollView style={styles.containerGeral}>
      <Text style={styles.tituloPrincipal}>Serviços</Text>
      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Atendimento Psicanalítico</Text>
        <Text style={styles.texto}>
<<<<<<< HEAD
          Marque uma sessão de psicanálise cuide de sua saúde mental!
=======
          Marque uma sessão de psicanálisee cuide de sua saúde mental!
>>>>>>> b1a80bece57cd05bc8be8b925b38034c0cb36430
        </Text>
        <Text style={styles.valor}>R$100,00</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Consultoria Contábil/Financeira</Text>
        <Text style={styles.texto}>
          Receba orientações relacionadas a contabilidade ou finanças de uma profissional experiente na área!
        </Text>
        <Text style={styles.valor}>A partir de R$30,00</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Treinamento</Text>
        <Text style={styles.texto}>
          Adquira conhecimento e melhore suas habilidades profissionais!
        </Text>
        <Text style={styles.valor}>A partir de R$70,00 mensais</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Ánálise Comportamental</Text>
        <Text style={styles.texto}>
          Melhore sua comunicação com as pessoas ao seu redor e alcance melhor produtividade de maneira eficiente!
        </Text>
        <Text style={styles.valor}>A partir de R$70,00 mensais</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Inteligência Emocional</Text>
        <Text style={styles.texto}>
<<<<<<< HEAD
          Aprimore seu autoconhecimento e defina com segurança seus sentimentos
          para melhorar sua vida profissional e pessoal!
=======
          Aprimore seu autoconhecimento e defina com segurança seus sentimentos 
          para melhorar sua vida profissional e pessoal!        
>>>>>>> b1a80bece57cd05bc8be8b925b38034c0cb36430
        </Text>
        <Text style={styles.valor}>A partir de R$70,00 mensais</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Terapia Cognitiva Comportamental - TCC</Text>
        <Text style={styles.texto}>
<<<<<<< HEAD
          Marque já um atendimento e busque entender sua realidade para compreender seus sentimentos e atitudes!
=======
          Marque já um atendimento e busque entender sua realidade para compreender seus sentimentos e atitudes!        
>>>>>>> b1a80bece57cd05bc8be8b925b38034c0cb36430
        </Text>
        <Text style={styles.valor}>R$100,00</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerGeral: {
    flexGrow: 1,
    flex: 1,
    alignSelf: 'center',
  },

  tituloPrincipal: {
    fontSize: 24,
    color: '#000000',
<<<<<<< HEAD
    marginTop: 40,
=======
    marginTop: 20,
>>>>>>> b1a80bece57cd05bc8be8b925b38034c0cb36430
    fontWeight: 'bold',
    textAlign: 'center',
  },

<<<<<<< HEAD
  container: {
=======
  container:{
>>>>>>> b1a80bece57cd05bc8be8b925b38034c0cb36430
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#034AA6',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    width: '96%',
  },

<<<<<<< HEAD
  containerTitulo: {
=======
  containerTitulo:{
>>>>>>> b1a80bece57cd05bc8be8b925b38034c0cb36430
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

<<<<<<< HEAD
  texto: {
=======
  texto:{
>>>>>>> b1a80bece57cd05bc8be8b925b38034c0cb36430
    color: '#AACBDE',
    fontSize: 14,
    textAlign: 'justify',
  },

<<<<<<< HEAD
  valor: {
=======
  valor:{
>>>>>>> b1a80bece57cd05bc8be8b925b38034c0cb36430
    color: '#034AA6',
    textAlign: 'center',
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5,
<<<<<<< HEAD
    overflow: 'hidden',
=======
>>>>>>> b1a80bece57cd05bc8be8b925b38034c0cb36430
  }
})