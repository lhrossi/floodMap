export type Abrigo = {
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
    status: "ERROR" | "OK";
  };
  demanda: string;
  cozinha: boolean | null;
  banheiros: number | null;
  nome_contato: string;
  pmpa: string;
  address: string;
  telefone: string;
  nome: string;
  estrutura_pessoas: "sim" | null;
  create_in: {
    seconds: number;
    nanoseconds: number;
  };
  vagas_ocupadas: string;
};
