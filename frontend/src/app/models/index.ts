export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf?: string;
  role: 'cidadao' | 'admin';
  ativo: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface Noticia {
  id: number;
  titulo: string;
  conteudo: string;
  categoria: string;
  secretaria?: string;
  imagem?: string;
  createdAt: string;
}

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  local: string;
  data: string;
  hora: string;
  cancelado?: boolean;
}

export interface Reclamacao {
  id: number;
  protocolo: string;
  userId: number;
  categoria: string;
  descricao: string;
  foto?: string;
  latitude?: number;
  longitude?: number;
  status: 'aberto' | 'em_andamento' | 'resolvido';
  createdAt: string;
  atualizacoes?: AtualizacaoReclamacao[];
}

export interface AtualizacaoReclamacao {
  id: number;
  mensagem: string;
  status: string;
  createdAt: string;
}

export interface Ideia {
  id: number;
  userId: number;
  titulo: string;
  descricao: string;
  categoria: string;
  status: 'recebida' | 'em_analise' | 'aprovada' | 'implementada';
  votos: number;
  jaVotou: boolean;
  createdAt: string;
}

export interface Feedback {
  id: number;
  userId: number;
  projeto: string;
  nota: number;
  comentario?: string;
  createdAt: string;
}

export interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
  createdAt: string;
}

export interface Transparencia {
  totalUsuarios: number;
  totalReclamacoes: number;
  reclamacoesResolvidas: number;
  ideiasTotal: number;
  ideiasImplementadas: number;
  mediaAvaliacoes: number;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}
