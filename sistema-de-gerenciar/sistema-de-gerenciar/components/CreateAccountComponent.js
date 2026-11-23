import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Switch,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons as MaterialDesignIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { salvarUsuario } from '../storage';
import styles from '../url/Styles/ComponentsLogin';

export default function CreateAccountComponent({ voltar }) {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [cpf, setCpf] = useState('');

  const [banco, setBanco] = useState('');
  const [menuBancoAberto, setMenuBancoAberto] = useState(false);
  const opcoesBanco = [
    'Nubank',
    'Banco do Brasil',
    'Itaú',
    'Bradesco',
    'Caixa Econômica',
    'Santander',
    'Banco Inter',
    'C6 Bank',
    'PicPay',
    'Outro',
  ];

  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');
  const [pix, setPix] = useState('');
  const [notificacoes, setNotificacoes] = useState(true);

  // Apenas letras no nome
  const handleApenasLetras = (text, setter) => {
    const apenasLetras = text.replace(
      /[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]/g,
      ''
    );
    setter(apenasLetras);
  };

  // Apenas números com limite de 9
  const handleNumbers = (text, setter, maxLength) => {
    const apenasNumeros = text.replace(/[^0-9]/g, '');
    if (apenasNumeros.length <= maxLength) {
      setter(apenasNumeros);
    }
  };

  // Formatação de CPF (000.000.000-00)
  const handleCpf = (text) => {
    const apenasNumeros = text.replace(/\D/g, '');
    if (apenasNumeros.length <= 11) {
      let formatado = apenasNumeros;
      if (apenasNumeros.length > 3) {
        formatado = `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3)}`;
      }
      if (apenasNumeros.length > 6) {
        formatado = `${formatado.slice(0, 7)}.${formatado.slice(7)}`;
      }
      if (apenasNumeros.length > 9) {
        formatado = `${formatado.slice(0, 11)}-${formatado.slice(11)}`;
      }
      setCpf(formatado);
    }
  };

  // Formatação padrão de Conta (12345-6)
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

  const handleCreateAccount = async () => {
    if (
      !nome.trim() ||
      !email ||
      !senha ||
      !dia ||
      !mes ||
      !ano ||
      !cpf ||
      !banco ||
      !agencia ||
      !conta ||
      !pix
    ) {
      Alert.alert('Erro', 'Erro. verifique se respondeu todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/i;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'O e-mail precisa conter "@" e terminar com ".com".');
      return;
    }

    if (conta.length !== 7) {
      Alert.alert(
        'Erro',
        'A conta deve estar no formato correto (ex: 12345-6).'
      );
      return;
    }

    // Para o "Membro desde"
    const agora = new Date();
    const meses = [
      'JAN',
      'FEV',
      'MAR',
      'ABR',
      'MAI',
      'JUN',
      'JUL',
      'AGO',
      'SET',
      'OUT',
      'NOV',
      'DEZ',
    ];
    const membroDesdeFormatado = `${
      meses[agora.getMonth()]
    }/${agora.getFullYear()}`;

    // Passando pro JSON
    const novoUsuario = {
      id: Date.now().toString(),
      nome: nome.trim(),
      email: email.trim(),
      senha,
      dataNascimento: `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`,
      cpf,
      banco,
      agencia,
      conta,
      pix,
      notificacoes,
      membroDesde: membroDesdeFormatado, // Salva o mês e ano atual do cadastro
    };

    const sucesso = await salvarUsuario(novoUsuario);

    if (sucesso) {
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('MainTabs');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}> </View>

      <View style={styles.row}>
        <Pressable style={styles.backButton} onPress={voltar}>
          <Ionicons name="caret-back" size={40} />
        </Pressable>
        <Text style={styles.title}>CRIE SUA CONTA</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>

        <View style={styles.form}>

          <View>
            <Text style={styles.label}>NOME:</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={(text) => handleApenasLetras(text, setNome)}
            />
          </View>

          <View>
            <Text style={styles.label}>EMAIL:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text style={styles.label}>SENHA:</Text>
            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          <View>
            <Text style={styles.label}>DATA DE NASCIMENTO:</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TextInput
                style={[styles.input, stylesCreate.dateInput]}
                placeholder="DD"
                value={dia}
                onChangeText={(text) => handleNumbers(text, setDia, 2)}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, stylesCreate.dateInput]}
                placeholder="MM"
                value={mes}
                onChangeText={(text) => handleNumbers(text, setMes, 2)}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, stylesCreate.dateInput]}
                placeholder="AAAA"
                value={ano}
                onChangeText={(text) => handleNumbers(text, setAno, 4)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>CPF:</Text>
            <TextInput
              style={styles.input}
              placeholder="000.000.000-00"
              value={cpf}
              onChangeText={handleCpf}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>BANCO:</Text>
            <Pressable
              style={stylesCreate.selectButton}
              onPress={() => setMenuBancoAberto(!menuBancoAberto)}>
              <Text style={stylesCreate.optionText}>
                {banco || 'Selecione o banco'}
              </Text>
              <MaterialDesignIcons
                name={menuBancoAberto ? 'triangle' : 'triangle-down'}
                size={20}
              />
            </Pressable>

            {menuBancoAberto && (
              <View style={stylesCreate.dropdownContainer}>
                {opcoesBanco.map((opcao) => (
                  <Pressable
                    key={opcao}
                    style={[
                      stylesCreate.dropdownItem,
                      banco === opcao && stylesCreate.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      setBanco(opcao);
                      setMenuBancoAberto(false);
                    }}>
                    <Text style={stylesCreate.optionText}>{opcao}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View>
            <Text style={styles.label}>AGÊNCIA:</Text>
            <TextInput
              style={styles.input}
              value={agencia}
              onChangeText={(text) => handleNumbers(text, setAgencia, 6)}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>CONTA (12345-6):</Text>
            <TextInput
              style={styles.input}
              placeholder="12345-6"
              value={conta}
              onChangeText={handleConta}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>CHAVE PIX:</Text>
            <TextInput
              style={styles.input}
              value={pix}
              onChangeText={setPix}
              autoCapitalize="none"
            />
          </View>

          {/* Notificações de Gastos */}
          <View style={stylesCreate.notificacaoSwitch}>
            <Text style={styles.label}>NOTIFICAÇÕES DE GASTOS:</Text>
            <Switch value={notificacoes} onValueChange={setNotificacoes} />
          </View>

          <Pressable style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>CRIAR</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.footer} />
    </SafeAreaView>
  );
}

const stylesCreate = StyleSheet.create({
  optionText: {
    fontSize: 16,
  },
  selectButton: {
    backgroundColor: '#C7F2A7',
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#C7F2A7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  dropdownItemSelected: {
    backgroundColor: '#858585',
  },
  dateInput: {
    flex: 1,
    textAlign: 'center',
  },
  notificacaoSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
