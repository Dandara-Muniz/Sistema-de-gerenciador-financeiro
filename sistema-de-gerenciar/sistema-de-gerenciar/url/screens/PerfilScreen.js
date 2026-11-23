import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons as MaterialDesignIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { carregarUsuario } from '../../storage'; 
import styles from '../Styles/AllStyles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FOTO_PERFIL_KEY = '@usuario_foto_perfil';

export default function PerfilScreen() {
  const [secaoAberta, setSecaoAberta] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [fotoUri, setFotoUri] = useState(null);

  // Carregar os dados do usuário e a foto salva
  useEffect(() => {
    async function buscarDados() {
      const dadosSalvos = await carregarUsuario();
      if (dadosSalvos) {
        setUsuario(dadosSalvos);
      }

      // Carregar foto salva anteriormente
      const fotoSalva = await AsyncStorage.getItem(FOTO_PERFIL_KEY);
      if (fotoSalva) {
        setFotoUri(fotoSalva);
      }
    }
    buscarDados();
  }, []);

  // Função para abrir a galeria e escolher a foto
  async function escolherFoto() {

    // Pedir permissão
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissao.granted) {
      Alert.alert('Permissão negada', 'Precisamos de permissão para acessar sua galeria!');
      return;
    }

    // Abrir a galeria do celular
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Deixa a imagem quadrada
      quality: 0.8,
    });

    // Se o usuário escolheu a imagem, salvar no estado e no AsyncStorage
    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      const uriSelecionada = resultado.assets[0].uri;
      setFotoUri(uriSelecionada);
      
      try {
        await AsyncStorage.setItem(FOTO_PERFIL_KEY, uriSelecionada);
      } catch (error) {
        console.log('Erro ao salvar foto localmente', error);
      }
    }
  }

  function toggleSecao(id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSecaoAberta((prev) => (prev === id ? null : id));
  }

  const perfil_informacao = [
    {
      id: 'pessoais',
      titulo: 'DADOS PESSOAIS',
      detalhes: [
        `NOME: ${usuario?.nome || 'NÃO INFORMADO'}`,
        `NASCIMENTO: ${usuario?.dataNascimento || '00/00/0000'}`,
        `CPF: ${usuario?.cpf || '000.000.000-00'}`,
        `EMAIL: ${usuario?.email || 'email@email.com'}`,
      ],
    },
    {
      id: 'bancarios',
      titulo: 'DADOS BANCÁRIOS',
      detalhes: [
        `BANCO: ${usuario?.banco || 'NÃO INFORMADO'}`,
        `AGÊNCIA: ${usuario?.agencia || '0000'}`,
        `CONTA: ${usuario?.conta || '00000-0'}`,
        `CHAVE PIX: ${usuario?.pix || 'NÃO INFORMADA'}`,
      ],
    },
    {
      id: 'privacidade',
      titulo: 'DIREITOS DE PRIVACIDADE',
      detalhes: [
        `SENHA: ${usuario?.senha ? '••••••••' : 'NÃO INFORMADA'}`,
      ],
    },
    {
      id: 'preferencias',
      titulo: 'PREFERÊNCIAS DE USO',
      detalhes: [
        `NOTIFICAÇÕES DE GASTOS: ${usuario?.notificacoes ? 'ATIVADAS' : 'DESATIVADAS'}`,
        'TEMA DO APLICATIVO: CLARO',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.row}>
      
        <Pressable onPress={escolherFoto} style={stylesPerfil.photoContainer}>
          {fotoUri ? (
            <Image source={{ uri: fotoUri }} style={stylesPerfil.photo} />
          ) : (
            <View style={stylesPerfil.photoIcon}>
              <MaterialDesignIcons name="camera-plus" size={30} color="#555" />
            </View>
          )}
        </Pressable>

        <View style={stylesPerfil.userInfo}>
          <Text style={stylesPerfil.subTitle}>
            {usuario?.nome ? usuario.nome.toUpperCase() : 'NOME USUÁRIO'} {'\n'}
            MEMBRO DESDE: {usuario?.membroDesde || 'NÃO SEI'}
          </Text>
        </View>

        <View style={stylesPerfil.lista}>
          {perfil_informacao.map((secao) => {
            const aberta = secaoAberta === secao.id;
            return (
              <View key={secao.id} style={stylesPerfil.listaBloco}>
                <Pressable
                  onPress={() => toggleSecao(secao.id)}
                  style={({ pressed }) => [
                    stylesPerfil.rowBloco,
                    pressed && { backgroundColor: '#F2EFC7' },
                  ]}>
                  <Text style={styles.subTitle}>{secao.titulo}</Text>
                  <MaterialDesignIcons
                    name={aberta ? 'triangle' : 'triangle-down'}
                    size={20}
                  />
                </Pressable>

                {aberta && (
                  <View style={stylesPerfil.itemBloco}>
                    {secao.detalhes.map((linha, index) => (
                      <Text key={index} style={stylesPerfil.subTitle}>
                        {linha}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const stylesPerfil = StyleSheet.create({
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoIcon: {
    flex: 1,
    backgroundColor: '#FAF8DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    width: '100%',
    marginLeft: 10,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lista: {
    width: '100%',
    gap: 10,
  },
  listaBloco: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#FAF8DE',
  },
  rowBloco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  itemBloco: {
    borderTopWidth: 1,
    borderTopColor: '#999999',
    padding: 12,
    backgroundColor: '#FCFBE8',
    gap: 6,
  },
});