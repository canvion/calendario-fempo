import { Injectable } from '@angular/core';
import { DiaCalendari } from '../../core/models/configuracion.interface';

@Injectable({
  providedIn: 'root'
})
export class CalendariService {

  private festivos: Date[] = [
    // Navidad 2025
    new Date(2025, 11, 8), new Date(2025, 11, 22), new Date(2025, 11, 23),
    new Date(2025, 11, 24), new Date(2025, 11, 25), new Date(2025, 11, 26),
    new Date(2025, 11, 27), new Date(2025, 11, 28), new Date(2025, 11, 29),
    new Date(2025, 11, 30), new Date(2025, 11, 31),
    // Año Nuevo 2026
    new Date(2026, 0, 1), new Date(2026, 0, 2), new Date(2026, 0, 5),
    new Date(2026, 0, 6), new Date(2026, 0, 20),
    // Carnaval
    new Date(2026, 1, 27), new Date(2026, 2, 2), new Date(2026, 2, 3),
    // Semana Santa
    new Date(2026, 3, 2), new Date(2026, 3, 3), new Date(2026, 3, 6),
    new Date(2026, 3, 7), new Date(2026, 3, 8), new Date(2026, 3, 9),
    new Date(2026, 3, 10),
    // Mayo
    new Date(2026, 4, 1), new Date(2026, 4, 4)
  ];

  constructor() { }

  /**
   * Genera tots els dies per a un any complet
   */
  generarAnyComplet(any: number): DiaCalendari[][] {
    const mesos: DiaCalendari[][] = [];
    for (let mes = 0; mes < 12; mes++) {
      mesos.push(this.generarDiesMes(any, mes));
    }
    return mesos;
  }

  /**
   * Genera tots els dies d'un mes concret
   */
  private generarDiesMes(any: number, mes: number): DiaCalendari[] {
    const dies: DiaCalendari[] = [];

    // Primer dia del mes
    const primerDia = new Date(any, mes, 1);
    const primerDiaSetmana = primerDia.getDay();

    // Últim dia del mes
    const ultimDia = new Date(any, mes + 1, 0);
    const diesDelMes = ultimDia.getDate();

    // Afegir dies buits al principi (dies del mes anterior)
    const diesBuitsInici = primerDiaSetmana === 0 ? 6 : primerDiaSetmana - 1;
    for (let i = diesBuitsInici; i > 0; i--) {
      const data = new Date(any, mes, 1 - i);
      dies.push(this.crearDiaCalendari(data, false));
    }

    // Afegir tots els dies del mes
    for (let dia = 1; dia <= diesDelMes; dia++) {
      const data = new Date(any, mes, dia);
      dies.push(this.crearDiaCalendari(data, true));
    }

    // Completar la darrera setmana amb dies del mes següent
    const diesTotals = dies.length;
    const diesBuitsFinal = diesTotals % 7 === 0 ? 0 : 7 - (diesTotals % 7);
    for (let i = 1; i <= diesBuitsFinal; i++) {
      const data = new Date(any, mes + 1, i);
      dies.push(this.crearDiaCalendari(data, false));
    }

    return dies;
  }

  /**
   * Crea un objecte DiaCalendari a partir d'una data
   */
  private crearDiaCalendari(data: Date, esDinsDelMes: boolean): DiaCalendari {
    return {
      data: data,
      numero: data.getDate(),
      esDinsDelMes: esDinsDelMes,
      esCapDeSetmana: this.esCapDeSetmana(data),
      esFestiu: this.esFestiu(data),
      esDiaPractiques: false
    };
  }

  /**
   * Comprova si una data és cap de setmana
   */
  private esCapDeSetmana(data: Date): boolean {
    const dia = data.getDay();
    return dia === 0 || dia === 6;
  }

  /**
   * Comprova si una data és festiu
   */
  private esFestiu(data: Date): boolean {
    return this.festivos.some(festiu =>
      festiu.getDate() === data.getDate() &&
      festiu.getMonth() === data.getMonth() &&
      festiu.getFullYear() === data.getFullYear()
    );
  }

  /**
   * Obté el nom del mes
   */
  getNomMes(indexMes: number): string {
    const noms = [
      'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
      'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
    ];
    return noms[indexMes];
  }

  /**
   * Marca els dies de pràctiques al calendari
   */
  marcarDiesPractiques(mesos: DiaCalendari[][], dataInicial: Date, dataFinal: Date): void {
    for (const diesMes of mesos) {
      for (const dia of diesMes) {
        if (dia.esDinsDelMes && !dia.esCapDeSetmana && !dia.esFestiu) {
          dia.esDiaPractiques = this.esDintrePeriode(dia.data, dataInicial, dataFinal);
        }
      }
    }
  }

  /**
   * Comprova si una data està dins del període
   */
  private esDintrePeriode(data: Date, dataInicial: Date, dataFinal: Date): boolean {
    const dataComp = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    const iniciComp = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate());
    const finalComp = new Date(dataFinal.getFullYear(), dataFinal.getMonth(), dataFinal.getDate());

    return dataComp >= iniciComp && dataComp <= finalComp;
  }
}
