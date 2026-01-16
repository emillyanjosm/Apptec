// services/SupabaseService.js
import { supabase } from '../config/supabase';

export const SupabaseService = {
  // ========== AUTENTICAÇÃO ==========
  async cadastrarUsuario(email, senha, dadosAdicionais = {}) {
    try {
      // 1. Cadastra no Auth do Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
      });

      if (authError) throw authError;

      // 2. Salva dados adicionais na tabela usuarios
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('usuarios')
          .insert({
            id: authData.user.id,
            email: email,
            nome: dadosAdicionais.nome || email.split('@')[0],
            tipo: dadosAdicionais.tipo || 'cidadao',
            telefone: dadosAdicionais.telefone,
            endereco: dadosAdicionais.endereco,
          });

        if (profileError) throw profileError;
      }

      return { success: true, user: authData.user };
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return { success: false, error: error.message };
    }
  },

  async login(email, senha) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { success: false, error: error.message };
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return { success: false, error: error.message };
    }
  },

  async getUsuarioAtual() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return { success: false, error: 'Nenhum usuário logado' };

      // Busca dados completos do usuário
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return { success: true, user: { ...user, ...usuario } };
    } catch (error) {
      console.error('Erro ao buscar usuário atual:', error);
      return { success: false, error: error.message };
    }
  },

  // ========== PONTOS DE COLETA ==========
  async buscarPontosColeta(filtros = {}) {
    try {
      let query = supabase
        .from('pontos_coleta')
        .select('*');

      // Aplicar filtros
      if (filtros.categoria) {
        query = query.eq('categoria', filtros.categoria);
      }

      if (filtros.status) {
        query = query.eq('status', filtros.status);
      }

      // Ordenar por mais recente
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao buscar pontos de coleta:', error);
      return { success: false, error: error.message };
    }
  },

  async criarPontoColeta(pontoData) {
    try {
      // Pega usuário atual
      const user = await this.getUsuarioAtual();
      if (!user.success) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('pontos_coleta')
        .insert({
          ...pontoData,
          criado_por: user.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao criar ponto de coleta:', error);
      return { success: false, error: error.message };
    }
  },

  // ========== COLETAS (HISTÓRICO) ==========
  async criarColeta(coletaData) {
    try {
      const user = await this.getUsuarioAtual();
      if (!user.success) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('coletas')
        .insert({
          ...coletaData,
          catador_id: user.user.id,
          status: 'pendente',
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao criar coleta:', error);
      return { success: false, error: error.message };
    }
  },

  async buscarColetasDoUsuario() {
    try {
      const user = await this.getUsuarioAtual();
      if (!user.success) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('coletas')
        .select(`
          *,
          pontos_coleta (
            nome,
            endereco,
            latitude,
            longitude
          )
        `)
        .eq('catador_id', user.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao buscar coletas:', error);
      return { success: false, error: error.message };
    }
  },

  async atualizarStatusColeta(coletaId, novoStatus) {
    try {
      const user = await this.getUsuarioAtual();
      if (!user.success) throw new Error('Usuário não autenticado');

      const updates = { status: novoStatus };
      
      if (novoStatus === 'concluida') {
        updates.data_conclusao = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('coletas')
        .update(updates)
        .eq('id', coletaId)
        .eq('catador_id', user.user.id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao atualizar coleta:', error);
      return { success: false, error: error.message };
    }
  },

  // ========== DADOS DE EXEMPLO (para teste) ==========
  async popularDadosExemplo() {
    try {
      // Pontos de coleta de exemplo
      const pontosExemplo = [
        {
          nome: "Praça da Matriz",
          descricao: "Ponto central de coleta",
          latitude: -4.978399,
          longitude: -39.015302,
          endereco: "Centro, Rua Principal, 123",
          horario_funcionamento: "08:00 - 18:00",
          contato: "(88) 99999-9999",
          categoria: "papel",
          status: "ativo"
        },
        {
          nome: "Mercado Público",
          descricao: "Feira e comércio local",
          latitude: -4.973500,
          longitude: -39.016800,
          endereco: "Av. Central, 456",
          horario_funcionamento: "06:00 - 20:00",
          contato: "(88) 98888-8888",
          categoria: "plastico",
          status: "ativo"
        }
      ];

      // Insere pontos
      for (const ponto of pontosExemplo) {
        const { error } = await supabase
          .from('pontos_coleta')
          .insert(ponto);

        if (error) console.warn('Erro ao inserir ponto:', error);
      }

      return { success: true, message: 'Dados de exemplo inseridos' };
    } catch (error) {
      console.error('Erro ao popular dados:', error);
      return { success: false, error: error.message };
    }
  },
};