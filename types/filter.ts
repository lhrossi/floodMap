import type { Abrigo } from "./abrigo";

export type Filter = {
  name: string;
  enabled: boolean;
  filterFunction: (item: Abrigo) => boolean;
};
