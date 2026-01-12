export interface Configuracion {
  dataInici: string;
  horesTotals: number;
  horesDiaries: number;
}

export interface ResultatCalcul {
  dataFinal: Date;
  diesLectius: number;
  horesReals: number;
}

// Interfaces sugeridas por el profesor
export interface PeriodePractiques {
  dataInicial: Date;
  dataFinal: Date;
  horesTotals: number;
  horesDiaries: number;
  diesLaborables: number;
}

export interface DiaCalendari {
  data: Date;
  numero: number;
  esDinsDelMes: boolean;
  esCapDeSetmana: boolean;
  esFestiu: boolean;
  esDiaPractiques: boolean;
}
