import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import styles from '../Styles/AllStyles';
import { useFocusEffect } from '@react-navigation/native';
import { carregarSaidas } from '../../storage';

export default function SaidaScreen() {
  const [saidas, setSaidas] = useState([]);

  // Recarrega os dados toda vez que a tela é aberta
  useFocusEffect(
    useCallback(() => {
      async function buscarDados() {
        const dados = await carregarSaidas();
        setSaidas(dados);
      }
      buscarDados();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.rowColumn}>
        <Text style={styles.title}>MINHAS SAÍDAS</Text>
        {saidas.length === 0 ? (
          <Text style={styles.subTitle}>Nenhuma saída cadastrada ainda.</Text>
        ) : (
          saidas.map((item) => (
            <View key={item.id} style={stylesSaida.card}>
              <Text style={styles.subTitle}>-------{item.data}------</Text>

              <View style={stylesSaida.row}>
                <Text style={styles.text}>Valor: R$ {item.valor}</Text>
                <Text style={styles.text}>Categoria: {item.categoria}</Text>
              </View>

              <View style={stylesSaida.row}>
                <Text style={styles.text}>
                  Pagamento via: {item.formaPagamento}
                </Text>
                <Text style={styles.text}>
                  Destinatario: {item.destinatario}
                </Text>
              </View>

              <View style={stylesSaida.row}>
                <Text style={styles.text}>
                  Ocorrência: {item.tipoOcorrencia}
                </Text>
                <Text style={styles.text}>Conta: {item.conta}</Text>
              </View>

              <View style={stylesSaida.row}>
                <Text style={styles.text}>
                  Descrição: <Text style={styles.value}>{item.descricao}</Text>
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const stylesSaida = StyleSheet.create({
  card: {
    backgroundColor: '#F2ABA6',
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
