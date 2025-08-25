import { View, SafeAreaView, StyleSheet, Text, FlatList, ScrollView } from 'react-native';

export default function VisuServicos() {
  return (
    <ScrollView style={styles.container}>
      <Text>Serviços</Text>
      <View>
        <Text>Lorem Ipsum</Text>
        <Text>R$100,00</Text>
      </View>
      <View>
        <Text>Lorem Ipsum</Text>
        <Text>R$100,00</Text>
      </View>
      <View>
        <Text>Lorem Ipsum</Text>
        <Text>R$100,00</Text>
      </View>
      <View>
        <Text>Lorem Ipsum</Text>
        <Text>R$100,00</Text>
      </View>
      <View>
        <Text>Lorem Ipsum</Text>
        <Text>R$100,00</Text>
      </View>
      <View>
        <Text>Lorem Ipsum</Text>
        <Text>R$100,00</Text>
      </View>
      <View>
        <Text>Lorem Ipsum</Text>
        <Text>R$100,00</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerServiços: {
    backgroundColor: 'blue',
    marginTop: 20,
  },

})