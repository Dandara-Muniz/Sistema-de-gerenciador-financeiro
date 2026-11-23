import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import styles from '../Styles/AllStyles';
import { useFocusEffect } from '@react-navigation/native';
import { carregarEntradas } from '../../storage';

export default function EntradaScreen() {
  const [entradas, setEntradas] = useState([]);

  // Recarrega os dados toda vez que a tela é aberta
  useFocusEffect(
    useCallback(() => {
      async function buscarDados() {
        const dados = await carregarEntradas();
        setEntradas(dados);
      }
      buscarDados();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.rowColumn}>
      <Text style={styles.title}>MINHAS ENTRADAS</Text>

      {entradas.length === 0 ? (
        <Text style={styles.subTitle}>Nenhuma entrada cadastrada ainda.</Text>
      ) : (
        entradas.map((item) => (
          <View key={item.id} style={stylesEntrada.card}>
            <Text style={styles.subTitle}>------{item.data}------</Text>

            <View style={stylesEntrada.row}>
              <Text style={styles.text}>Valor: R$ {item.valor}</Text>
              <Text style={styles.text}>Categoria: {item.categoria}</Text>
            </View>

            <View style={stylesEntrada.row}>
              <Text style={styles.text}>Fornecedor:{item.fornecedor}</Text>
              <Text style={styles.text}>Conta: {item.conta}</Text>
            </View>

            <View style={stylesEntrada.row}>
              <Text style={styles.text}>Descricao: {item.descricao}</Text>
            </View>
          </View>
        ))
      )}</View>
    </ScrollView>
  );
}

const stylesEntrada = StyleSheet.create({
  card: {
    backgroundColor: '#E3F8D3',
    minWidth: '90%',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
