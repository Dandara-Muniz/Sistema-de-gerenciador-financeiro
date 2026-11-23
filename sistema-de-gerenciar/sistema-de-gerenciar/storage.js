import AsyncStorage from '@react-native-async-storage/async-storage';

const ENTRADAS_KEY = '@sistema_entradas';
const SAIDAS_KEY = '@sistema_saidas';
const USUARIO_KEY = '@usuario_cadastrado';

// --- USUÁRIO ---
export async function salvarUsuario(novoUsuario) {
  try {
    await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(novoUsuario));
    return true;
  } catch (error) {
    console.log('Erro ao salvar usuário', error);
    return false;
  }
}

export async function carregarUsuario() {
  try {
    const dados = await AsyncStorage.getItem(USUARIO_KEY);
    return dados ? JSON.parse(dados) : null;
  } catch (error) {
    console.log('Erro ao carregar usuário', error);
    return null;
  }
}

// --- ENTRADAS ---
export async function carregarEntradas() {
  try {
    // Verifica usuárrio logado
    const usuarioLogado = await carregarUsuario();
    if (!usuarioLogado || !usuarioLogado.email) return [];

    // Salva no celular
    const dados = await AsyncStorage.getItem(ENTRADAS_KEY);
    const todasAsEntradas = dados ? JSON.parse(dados) : [];
    
    //Filtro pra realizada por aquele usuário
    return todasAsEntradas.filter(item => item.emailUsuario === usuarioLogado.email);
  } catch (error) {
    console.log('Erro ao carregar entradas', error);
    return [];
  }
}

export async function salvarEntradas(novaLista) {
  try {
    await AsyncStorage.setItem(ENTRADAS_KEY, JSON.stringify(novaLista));
  } catch (error) {
    console.log('Erro ao salvar entradas', error);
  }
}

// --- SAÍDAS ---
export async function carregarSaidas() {
  try {
   // Verifica usuárrio logado
    const usuarioLogado = await carregarUsuario();
    if (!usuarioLogado || !usuarioLogado.email) return [];

    // Salva no celular
    const dados = await AsyncStorage.getItem(SAIDAS_KEY);
    const todasAsSaidas = dados ? JSON.parse(dados) : [];
    
    //Filtro pra realizada por aquele usuário
    return todasAsSaidas.filter(item => item.emailUsuario === usuarioLogado.email);
  } catch (error) {
    console.log('Erro ao carregar saídas', error);
    return [];
  }
}

export async function salvarSaidas(novaLista) {
  try {
    await AsyncStorage.setItem(SAIDAS_KEY, JSON.stringify(novaLista));
  } catch (error) {
    console.log('Erro ao salvar saídas', error);
  }
}