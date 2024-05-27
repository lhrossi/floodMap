import type { Vaga } from './Abrigo';

export enum OccupationType {
  Person = 'person',
  Pet = 'pet',
  Both = 'both',
}

export interface RawOccupation {
  type: OccupationType;
  icon: string;
  label: string;
  totalSlots?: Vaga;
  occupiedSlots?: Vaga;
}

export interface Occupation {
  type: OccupationType;
  icon: string;
  label: string;
  totalSlots: number;
  occupiedSlots: number;
  occupiedPercentage: string;
  availableSlots: number;
  colors: {
    text: string;
    background: string;
    marker: string;
  };
}
