import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { carregarUsuario } from '../storage';
import styles from '../url/Styles/ComponentsLogin';

export default function LoginComponent({ voltar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email.trim() === '' || senha === '') {
      Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    try {
      const usuarioSalvo = await carregarUsuario();

      if (!usuarioSalvo) {
        Alert.alert(
          'Erro',
          'Nenhuma conta encontrada. Por favor, crie uma conta primeiro.'
        );
        return;
      }

      if (usuarioSalvo.email === email.trim() && usuarioSalvo.senha === senha) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('MainTabs');
      } else {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}> </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.row}>
          <Pressable style={styles.backButton} onPress={voltar}>
            <Ionicons name="caret-back" size={40} />
          </Pressable>
          <Text style={styles.title}>REALIZE O LOGIN:</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.form}>
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

            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>ENTRAR</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer} />
    </SafeAreaView>
  );
}
