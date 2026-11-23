import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Pressable } from 'react-native';
import styles from '../url/Styles/FormsStyles';
import { MaterialCommunityIcons as MaterialDesignIcons } from '@expo/vector-icons';
import { carregarUsuario } from '../storage';

export default function FormSaida({ onAddSaida }) {
  const [valor, setValor] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [descricao, setDescricao] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [categoria, setCategoria] = useState('');
  const [menuCategoriaAberto, setMenuCategoriaAberto] = useState(false);
  const [conta, setConta] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [tipoOcorrencia, setTipoOcorrencia] = useState('');

  const opcoesCategoria = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Conta de água',
    'Conta de luz',
    'Aluguel',
    'Lazer',
    'Saúde',
    'Outros',
  ];

  const handleText = (text) => {
    const apenasLetras = text.replace(
      /[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]/g,
      ''
    );
    setDestinatario(apenasLetras);
  };

  const handleNumbers = (text, setter, maxLength) => {
    const apenasNumeros = text.replace(/[^0-9]/g, '');
    if (apenasNumeros.length <= maxLength) {
      setter(apenasNumeros);
    }
  };

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
      !dia ||
      !mes ||
      !ano ||
      !destinatario ||
      !categoria ||
      !conta ||
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

    const novaSaida = {
      id: Date.now().toString(),
      emailUsuario: emailAtual,
      valor,
      data: `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`,
      destinatario,
      categoria,
      conta,
      formaPagamento: formaPagamento || 'Não informada',
      tipoOcorrencia: tipoOcorrencia || 'Não informada',
      descricao: descricao || 'Nenhuma descrição',
    };

    if (onAddSaida) {
      onAddSaida(novaSaida);
    }

    // Limpar campos após enviar
    setValor('');
    setDia('');
    setMes('');
    setAno('');
    setDescricao('');
    setDestinatario('');
    setCategoria('');
    setConta('');
    setFormaPagamento('');
    setTipoOcorrencia('');

    Alert.alert('Sucesso', 'Saída cadastrada com sucesso!');
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

      <Text style={styles.text}>Data de realização*</Text>
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

      <Text style={styles.text}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Acrescente uma descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.text}>Destinatario*</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do destinatario"
        value={destinatario}
        onChangeText={handleText}
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

      <Text style={styles.text}>Conta*</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex 12345-6"
        value={conta}
        onChangeText={handleConta}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Forma de pagamento</Text>
      <View style={styles.optionsRow}>
        {['Pix', 'Cartão', 'Dinheiro'].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.optionButton,
              formaPagamento === item && styles.optionButtonSelected,
            ]}
            onPress={() => setFormaPagamento(item)}>
            <Text style={[styles.optionText, formaPagamento === item]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.text}>Tipo de ocorrência</Text>
      <View style={styles.optionsRow}>
        {['Única', 'Fixa', 'Parcelada'].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.optionButton,
              tipoOcorrencia === item && styles.optionButtonSelected,
            ]}
            onPress={() => setTipoOcorrencia(item)}>
            <Text style={[styles.optionText, tipoOcorrencia === item]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <Button title="Confirmar" color="#D92626" onPress={handleSubmit} />
    </View>
  );
}
