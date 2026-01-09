import { Injectable } from '@angular/core';
import { Configuracion, ResultatCalcul } from '../../core/models/configuracion.interface';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private festivos: Date[] = [
    new Date(2025, 11, 8),  // 08/12/2025
    new Date(2025, 11, 22), // 22/12/2025
    new Date(2025, 11, 23), // 23/12/2025
    new Date(2025, 11, 24), // 24/12/2025
    new Date(2025, 11, 25), // 25/12/2025
    new Date(2025, 11, 26), // 26/12/2025
    new Date(2025, 11, 27), // 27/12/2025
    new Date(2025, 11, 28), // 28/12/2025
    new Date(2025, 11, 29), // 29/12/2025
    new Date(2025, 11, 30), // 30/12/2025
    new Date(2025, 11, 31), // 31/12/2025

    new Date(2026, 0, 1),   // 01/01/2026
    new Date(2026, 0, 2),   // 02/01/2026
    new Date(2026, 0, 5),   // 05/01/2026
    new Date(2026, 0, 6),   // 06/01/2026
    new Date(2026, 0, 20),  // 20/01/2026

    new Date(2026, 1, 27),  // 27/02/2026
    new Date(2026, 2, 2),   // 02/03/2026
    new Date(2026, 2, 3),   // 03/03/2026

    new Date(2026, 3, 2),   // 02/04/2026
    new Date(2026, 3, 3),   // 03/04/2026
    new Date(2026, 3, 6),   // 06/04/2026
    new Date(2026, 3, 7),   // 07/04/2026
    new Date(2026, 3, 8),   // 08/04/2026
    new Date(2026, 3, 9),   // 09/04/2026
    new Date(2026, 3, 10),  // 10/04/2026

    new Date(2026, 4, 1),   // 01/05/2026
    new Date(2026, 4, 4)    // 04/05/2026
  ];

  constructor() { }

  /**
   * Calcula la fecha final y otros datos a partir de la configuración
   */
  calcularPeriodoPractiques(config: Configuracion): ResultatCalcul {
    if (!config.dataInici || !config.horesTotals || !config.horesDiaries || config.horesDiaries === 0) {
      throw new Error('Configuració invàlida');
    }

    // Calcular días lectivos necesarios (redondeado hacia arriba)
    const diesLectius = Math.ceil(config.horesTotals / config.horesDiaries);

    // Calcular horas reales = días lectivos × horas diarias
    const horesReals = diesLectius * config.horesDiaries;

    // Calcular fecha final
    const fechaInicio = new Date(config.dataInici);
    const dataFinal = this.calcularFechaFinal(fechaInicio, diesLectius);

    return {
      dataFinal,
      diesLectius,
      horesReals
    };
  }

  /**
   * Calcula la fecha final
   */
  private calcularFechaFinal(fechaInicio: Date, diasLectivos: number): Date {
    let fecha = new Date(fechaInicio);
    let diasContados = 0;

    while (diasContados < diasLectivos) {
      fecha.setDate(fecha.getDate() + 1);

      if (this.esDiaLaborable(fecha)) {
        diasContados++;
      }
    }

    return fecha;
  }

  /**
   * Verifica si un día es laborable
   */
  private esDiaLaborable(fecha: Date): boolean {
    const diaSemana = fecha.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      return false;
    }
    return !this.esFestivo(fecha);
  }

  /**
   * Verifica si una fecha es festivo
   */
  private esFestivo(fecha: Date): boolean {
    return this.festivos.some(festivo =>
      festivo.getDate() === fecha.getDate() &&
      festivo.getMonth() === fecha.getMonth() &&
      festivo.getFullYear() === fecha.getFullYear()
    );
  }

  /**
   * Formatea una fecha con idioma de salida catalán
   */
  formatearFechaCatalan(fecha: Date): string {
    const dias = ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'];
    const meses = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny',
      'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];

    const diaSemana = dias[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anyo = fecha.getFullYear();

    return `${diaSemana}, ${dia} de ${mes} del ${anyo}`;
  }

  /**
   * Obtiene la lista de festivos
   */
  getFestivos(): Date[] {
    return [...this.festivos];
  }
}
