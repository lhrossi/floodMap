export interface Abrigo {
  id: string;
  vagas: string;
  roupa_cama: null;
  update_in: {
    seconds: number;
    nanoseconds: number;
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
    seconds: number;
    nanoseconds: number;
  };
  vagas_ocupadas: string;
  showPopup?: boolean;
  vagas_pet?: string | null;
  vagas_pet_ocupadas?: string | null;
}
