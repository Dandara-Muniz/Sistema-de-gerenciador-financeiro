import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import styles from '../Styles/AllStyles';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={stylesHome.space}>
        <Text style={styles.title}>GERENCIADOR</Text>
         <Image
        source={require('../../assets/SistemaGerenciador.png')}
        style={styles.logo}
      />
        <Text style={styles.title}>DA SUA RENDA</Text>
      </View>
        <Text style={styles.subTitle}>TWO HUNDRED AND TEN</Text>
    </View>
  );
}

const stylesHome = StyleSheet.create({
  space: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    gap: 10
  },
});
