import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import styles from '../Styles/AllStyles';
import LoginComponent from '../../components/LoginComponent';
import CreateAccountComponent from '../../components/CreateAccountComponent';

export default function LoginScreen() {
  const [telaAtual, setTelaAtual] = useState('login');

  if (telaAtual === 'enter') {
    return (
      <View style={styles.container}>
        <LoginComponent voltar={() => setTelaAtual('login')} navigation={'MainTabs'} />
        />
      </View>
    );
  }

  if (telaAtual === 'create') {
    return (
      <View style={styles.container}>
        <CreateAccountComponent voltar={() => setTelaAtual('login')} navigation={'MainTabs'}/>
      </View>
    );
  }

  return (
    <View style={stylesLogin.container}>
      <View style={stylesLogin.header}></View>

      <View style={stylesLogin.space}>
        <Text style={styles.title}>ENTRE OU CRIE UMA CONTA NO MONEYSISTEM</Text>

        <View>
          <Pressable
            style={stylesLogin.button}
            onPress={() => setTelaAtual('enter')}>
            <Text style={stylesLogin.text}>ENTRAR NA MINHA CONTA</Text>
          </Pressable>

          <Pressable
            style={stylesLogin.button}
            onPress={() => setTelaAtual('create')}>
            <Text style={stylesLogin.text}>CRIAR UMA CONTA</Text>
          </Pressable>
        </View>
      </View>

      <View style={stylesLogin.footer}></View>
    </View>
  );
}

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#4A4A52',
    width: '100%',
    height: 60,
  },
  footer: {
    height: 60,
    backgroundColor: '#4A4A52',
    width: '100%',
  },
  space: {
    width: '100%',
    height: '70%',
    flexDirection: 'column',
    gap: 200,
  },
  button: {
    backgroundColor: '#4A4A52',
    alignItems: 'center',
    justifyContent: 'center',
    width: 260,
    height: 50,
    marginLeft: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});
