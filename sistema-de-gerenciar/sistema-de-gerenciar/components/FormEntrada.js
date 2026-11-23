import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Pressable } from 'react-native';
import styles from '../url/Styles/FormsStyles';
import { MaterialCommunityIcons as MaterialDesignIcons } from '@expo/vector-icons';
import { carregarUsuario } from '../storage';

export default function FormEntrada({ onAddEntrada }) {
  const [valor, setValor] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [conta, setConta] = useState('');
  const [categoria, setCategoria] = useState('');
  const [menuCategoriaAberto, setMenuCategoriaAberto] = useState(false);

  const opcoesCategoria = ['Aluguel', 'Dívida', 'Emprestimo', 'Pagamento'];

  const handleText = (text) => {
    const apenasLetras = text.replace(
      /[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]/g,
      ''
    );
    setFornecedor(apenasLetras);
  };

  const handleNumbers = (text, setter, maxLength) => {
    const apenasNumeros = text.replace(/[^0-9]/g, '');
    if (apenasNumeros.length <= maxLength) {
      setter(apenasNumeros);
    }
  };

  //pega o valor inserido e faz o padrão pra real '1.000,00'
  const handleValor = (text) => {
    const apenasNumeros = text.replace(/\D/g, '');

    if (!apenasNumeros) {
      setValor('');
      return;
    }

    const numero = (parseInt(apenasNumeros, 10) / 100).toFixed(2);

    const formatado = numero
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    setValor(formatado);
  };

  // Pega o valor da conta. Limita o tamanho pra 6. Insere o hífen após o 5º número
  const handleConta = (numeroConta) => {
    const apenasNumeros = numeroConta.replace(/\D/g, '');

    const limitado = apenasNumeros.slice(0, 6);

    if (limitado.length > 5) {
      const formatado = `${limitado.slice(0, 5)}-${limitado.slice(5)}`;
      setConta(formatado);
    } else {
      setConta(limitado);
    }
  };
  const isValido = conta.length === 7;

  const handleSubmit = async () => {
    if (
      !valor.trim() ||
      !fornecedor ||
      !dia ||
      !mes ||
      !ano ||
      !conta ||
      !categoria ||
      !isValido
    ) {
      Alert.alert(
        'Erro',
        'Por favor, tente novamente. Nao esqueca de preencherr todos os campos obrigatorios(*) e de forma correta!!!'
      );
      return;
    }

    const usuarioLogado = await carregarUsuario();
    const emailAtual = usuarioLogado ? usuarioLogado.email : '';

    // Salva a entrada
    const novaEntrada = {
      id: Date.now().toString(),
      emailUsuario: emailAtual,
      valor,
      data: `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`,
      fornecedor,
      frequencia,
      descricao: descricao || 'Nenhuma descrição',
      conta,
      categoria,
    };

    // atualiza a lista de entradas
    if (onAddEntrada) {
      onAddEntrada(novaEntrada);
    }

    //Limpa os campos do formulário
    setValor('');
    setDia('');
    setMes('');
    setAno('');
    setFornecedor('');
    setFrequencia('');
    setDescricao('');
    setConta('');
    setCategoria('');

    Alert.alert('Sucesso', 'Entrada cadastrada com sucesso!');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Valor*</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui o valor"
        value={valor}
        onChangeText={handleValor}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Data*</Text>

      <View style={styles.dateRow}>
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="DD"
          value={dia}
          onChangeText={(text) => handleNumbers(text, setDia, 2)}
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="MM"
          value={mes}
          onChangeText={(text) => handleNumbers(text, setMes, 2)}
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.dateInputYear]}
          placeholder="YYYY"
          value={ano}
          onChangeText={(text) => handleNumbers(text, setAno, 4)}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>

      <Text style={styles.text}>Fornecedor*</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do fornecedor"
        value={fornecedor}
        onChangeText={handleText}
      />

      <Text style={styles.text}>Frequência*</Text>
      <View style={styles.optionsRow}>
        {['Única', 'Fixa', 'Parcelada'].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.optionButton,
              frequencia === item && styles.optionButtonSelected,
            ]}
            onPress={() => setFrequencia(item)}>
            <Text style={[styles.optionText, frequencia === item]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.text}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Acrescente uma descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.text}>Conta*</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex 12345-6"
        value={conta}
        onChangeText={handleConta}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Categoria*</Text>

      <Pressable
        style={styles.selectButton}
        onPress={() => setMenuCategoriaAberto(!menuCategoriaAberto)}>
        <Text style={styles.optionText}>
          {categoria || 'Selecione a categoria'}
        </Text>
        <MaterialDesignIcons
          name={menuCategoriaAberto ? 'triangle' : 'triangle-down'}
          size={20}
        />
      </Pressable>

      {menuCategoriaAberto && (
        <View style={styles.dropdownContainer}>
          {opcoesCategoria.map((opcao) => (
            <Pressable
              key={opcao}
              style={[
                styles.dropdownItem,
                categoria === opcao && styles.dropdownItemSelected,
              ]}
              onPress={() => {
                setCategoria(opcao);
                setMenuCategoriaAberto(false);
              }}>
              <Text style={styles.optionText}>{opcao}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <Button title="Confirmar" color="#1B8A2B" onPress={handleSubmit} />
    </View>
  );
}
