import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import styles from '../Styles/AllStyles';

// Caminho correto para os formulários
import FormEntrada from '../../components/FormEntrada';
import FormSaida from '../../components/FormSaida';

// Importa as funções de salvamento
import { carregarEntradas, salvarEntradas, carregarSaidas, salvarSaidas } from '../../storage';

export default function InsertScreen() {
  const [tipoSelecionado, setTipoSelecionado] = useState('entrada');
  const animacao = useRef(new Animated.Value(0)).current;

  function alternarTipo(novoTipo) {
    setTipoSelecionado(novoTipo);
    Animated.spring(animacao, {
      toValue: novoTipo === 'entrada' ? 0 : 1,
      useNativeDriver: false,
      bounciness: 6,
    }).start();
  }

  // Função chamada ao confirmar uma Entrada
  const handleAddEntrada = async (novaEntrada) => {
    try {
      const entradasAtuais = await carregarEntradas();
      const novaLista = [novaEntrada, ...entradasAtuais];
      await salvarEntradas(novaLista);
      Alert.alert('Sucesso', 'Entrada cadastrada com sucesso!');
    } catch (error) {
      console.log('Erro ao salvar entrada:', error);
    }
  };

  // Função chamada ao confirmar uma Saída
  const handleAddSaida = async (novaSaida) => {
    try {
      const saidasAtuais = await carregarSaidas();
      const novaLista = [novaSaida, ...saidasAtuais];
      await salvarSaidas(novaLista);
      Alert.alert('Sucesso', 'Saída cadastrada com sucesso!');
    } catch (error) {
      console.log('Erro ao salvar saída:', error);
    }
  };

  const corEntrada = animacao.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E3F8D3', '#FFFFFF'],
  });

  const corSaida = animacao.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', '#E3F8D3'],
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>
      <View style={{ padding: 30 }}>
        <Text style={styles.title}>INSIRA SUA ENTRADA/SAÍDA</Text>
        
        <View style={stylesInsert.buttonRow}>
          <Pressable
            onPress={() => alternarTipo('entrada')}
            style={({ pressed }) => [
              stylesInsert.buttonPressable,
              pressed && { transform: [{ scale: 0.96 }] },
            ]}>
            <Animated.View
              style={[
                stylesInsert.buttonStyle,
                { backgroundColor: corEntrada },
              ]}>
              <Text
                style={
                  tipoSelecionado === 'entrada' &&
                  stylesInsert.buttonPressableText
                }>
                ENTRADA
              </Text>
            </Animated.View>
          </Pressable>
          
          <Pressable
            onPress={() => alternarTipo('saida')}
            style={({ pressed }) => [
              stylesInsert.buttonPressable,
              pressed && { transform: [{ scale: 0.96 }] },
            ]}>
            <Animated.View
              style={[stylesInsert.buttonStyle, { backgroundColor: corSaida }]}>
              <Text
                style={
                  tipoSelecionado === 'saida' &&
                  stylesInsert.buttonPressableText
                }>
                SAÍDA
              </Text>
            </Animated.View>
          </Pressable>
        </View>

        {/* Passa as funções de salvamento para os formulários */}
        {tipoSelecionado === 'entrada' ? (
          <FormEntrada onAddEntrada={handleAddEntrada} />
        ) : (
          <FormSaida onAddSaida={handleAddSaida} />
        )}
      </View>
    </ScrollView>
  );
}

const stylesInsert = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  buttonPressable: { flex: 1 },
  buttonStyle: { padding: 10, alignItems: 'center', justifyContent: 'center' },
  buttonPressableText: { fontWeight: 'bold' },
});