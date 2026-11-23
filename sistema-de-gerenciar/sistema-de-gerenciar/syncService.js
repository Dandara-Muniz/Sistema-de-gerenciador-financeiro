import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { carregarEntradas, salvarEntradas, carregarSaidas, salvarSaidas } from './storage';

const API_URL = 'https://pinqndiuokwcybulhvez.supabase.co/rest/v1/';

const API_SECRET_KEY = 'sb_publishable_LyNOu1VMmHUsyIIlhp7wwA_jWV9ozOz'; 


// requisição usando a senha da API
async function requisicaoComSenhaDaApi(endpoint, metodo = 'GET', dados = null) {
  const opcoes = {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_SECRET_KEY}`,
    
    },
    body: dados ? JSON.stringify(dados) : null
  };

  const resposta = await fetch(`${API_URL}/${endpoint}`, opcoes);
  if (!resposta.ok) {
    throw new Error('Erro na comunicação com a API');
  }
  return await resposta.json();
}
 
// Função de Sincronização (Offline)
export async function sincronizarDados() {

  // Verifica se há conexão com a internet
  const estadoNet = await NetInfo.fetch();
  if (!estadoNet.isConnected) {
    console.log('Você está offline. As alterações estão salvas apenas localmente.');
    return;
  }
  try {
    console.log('Iniciando sincronização com a API...');

    // Carregar dados locais que precisam ser enviados
    const entradasLocais = await carregarEntradas();
    const saidasLocais = await carregarSaidas();

    // Filtrar itens que não foram enviados para o servidor
    const entradasPendentes = entradasLocais.filter(item => !item.synced);
    const saidasPendentes = saidasLocais.filter(item => !item.synced);

    // Enviar Entradas e Saídas pendentes
    for (const item of entradasPendentes) {
      await requisicaoAutenticada('entradas', 'POST', item);
      item.synced = true; //sincronizado se sucesso na API
    }

    for (const item of saidasPendentes) {
      await requisicaoAutenticada('saidas', 'POST', item);
      item.synced = true; 
    }

    // Atualizar o armazenamento local com o status de sincronizado
    if (entradasPendentes.length > 0) await salvarEntradas(entradasLocais);
    if (saidasPendentes.length > 0) await salvarSaidas(saidasLocais);

    //Busca dados novos da nuvem e atualiza o armazenamento local
    const entradasNuvem = await requisicaoAutenticada('entradas', 'GET');
    const saidasNuvem = await requisicaoAutenticada('saidas', 'GET');

    if (entradasNuvem) await salvarEntradas(entradasNuvem);
    if (saidasNuvem) await salvarSaidas(saidasNuvem);

    console.log('Sincronização concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a sincronização:', error.message);
  }
}