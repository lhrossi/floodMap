export interface Necessidade {
  item: string;
  quantidade: number;
  type: string | null;
}

export interface NecessidadeItem {
  label: string;
  values: string[];
}

export type Vaga = string | number | null;

export interface Abrigo {
  id: string;
  vagas: Vaga;
  vagas_ocupadas: Vaga;
  roupa_cama: null;
  update_in: {
    _seconds: number;
    _nanoseconds: number;
  };
  longitude: number;
  latitude: number;
  ext_getLatLongStatus: {
    error: string;
    status: string;
  };
  demanda: null;
  cozinha: null;
  banheiros: null;
  nome_contato: string;
  pmpa: string;
  address: string;
  telefone: string;
  nome: string;
  estrutura_pessoas: null;
  create_in: {
    _seconds: number;
    _nanoseconds: number;
  };
  vagas_pet?: Vaga;
  vagas_pet_ocupadas?: Vaga;
  itensUteis?: Necessidade[] | null;
  city?: string;
  abrigopm?: string;
}
