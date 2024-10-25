export interface Transaction {
  id?: string;
  id_usuario?: string;
  tipo?: 'entrada' | 'saida';
  valor?: string;
  descricao?: string;
  data?: string;
  saldo_anterior_transacao?: string;
  saldo_apos_transacao?: string;
  id_categoria?: string;
}
