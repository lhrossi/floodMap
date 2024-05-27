const citiesCoordinates: Record<string, { lat: number; lng: number; initialZoom: number; filterBySlug: string } | undefined> = {
  pelotas: {
    lat: -31.7575,
    lng: -52.3364,
    initialZoom: 11.5,
    filterBySlug: 'Pelotas',
  },
  riogrande: {
    lat: -32.0491,
    lng: -52.102,
    initialZoom: 11.5,
    filterBySlug: 'Rio Grande',
  },
  canoas: {
    lat: -29.9087,
    lng: -51.1829,
    initialZoom: 11.5,
    filterBySlug: 'Canoas',
  },
  viamao: {
    lat: -30.0837,
    lng: -51.0357,
    initialZoom: 11.5,
    filterBySlug: 'Viamão',
  },
  saoleopoldo: {
    lat: -29.7614,
    lng: -51.1427,
    initialZoom: 11.5,
    filterBySlug: 'São Leopoldo',
  },
  portoalegre: {
    lat: -30.0955,
    lng: -51.2066,
    initialZoom: 10,
    filterBySlug: 'Porto Alegre',
  },
  gravatai: {
    lat: -29.9412,
    lng: -50.9949,
    initialZoom: 11.5,
    filterBySlug: 'Gravataí',
  },
  cachoeirinha: {
    lat: -29.9457,
    lng: -51.0997,
    initialZoom: 11.5,
    filterBySlug: 'Cachoeirinha',
  },
  alvorada: {
    lat: -29.9993,
    lng: -51.07628,
    initialZoom: 11.5,
    filterBySlug: 'Alvorada',
  },
  sapucaiadosul: {
    lat: -29.8233,
    lng: -51.1477,
    initialZoom: 11.5,
    filterBySlug: 'Sapucaia do Sul',
  },
  igrejinha: {
    lat: -29.5733,
    lng: -50.7927,
    initialZoom: 11.5,
    filterBySlug: 'Igrejinha',
  },
};

export default citiesCoordinates;
