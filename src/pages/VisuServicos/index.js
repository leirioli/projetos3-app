import { View, SafeAreaView , Text, Image,  StyleSheet, ScrollView } from 'react-native';

export default function VisuServicos() {
  return (
    <ScrollView style={styles.containerGeral}>
      <Text style={styles.tituloPrincipal}>Serviços</Text>
      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Atendimento Psicanalítico</Text>
        <Text>
          Marque uma sessão de psicanálisee cuide de sua saúde mental!
        </Text>
        <Text>R$100,00</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Consultoria Contábil/Financeira</Text>
        <Text>
          Receba orientações relacionadas a contabilidade ou finanças de uma profissional experiente na área!
        </Text>
        <Text>A partir de R$30,00</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Treinamento</Text>
        <Text>
          Adquira conhecimento e melhore suas habilidades profissionais!
        </Text>
        <Text>A partir de R$70,00 mensais</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Ánálise Comportamental</Text>
        <Text>
          Melhore sua comunicação com as pessoas ao seu redor e alcance melhor produtividade de maneira eficiente!
        </Text>
        <Text>A partir de R$70,00 mensais</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Inteligência Emocional</Text>
        <Text>
          Aprimore seu autoconhecimento e defina com segurança seus sentimentos 
          para melhorar sua vida profissional e pessoal!        
        </Text>
        <Text>A partir de R$70,00 mensais</Text>
      </View>
      
      <View style={styles.container}>
        <Text style={styles.containerTitulo}>Terapia Cognitiva Comportamental - TCC</Text>
        <Text>
          Marque já um atendimento e busque entender sua realidade para compreender seus sentimentos e atitudes!        
        </Text>
        <Text>R$100,00</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerGeral:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tituloPrincipal:{
    fontSize: 24,
    color: '#000000',
  },

  container:{
    
  },

  containerTitulo:{

  },
})