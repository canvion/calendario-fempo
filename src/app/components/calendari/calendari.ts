import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendariService } from '../../shared/services/calendari.service';
import { CalendarioService } from '../../shared/services/calendario.service';
import { ConfiguracionComponent } from '../configuracion/configuracion';
import { DiaCalendari, PeriodePractiques } from '../../core/models/configuracion.interface';

@Component({
  selector: 'app-calendari',
  standalone: true,
  imports: [CommonModule, ConfiguracionComponent],
  templateUrl: './calendari.html',
  styleUrls: ['./calendari.css']
})
export class CalendariComponent implements OnInit {
  anyActual: number = 2026;
  mesos: DiaCalendari[][] = [];
  periodePractiques?: PeriodePractiques;
  diesSetmana: string[] = ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'];

  constructor(
    private calendariService: CalendariService,
    private calendarioService: CalendarioService
  ) { }

  ngOnInit(): void {
    this.carregarCalendari();
  }

  /**
   * Carrega el calendari complet de l'any
   */
  carregarCalendari(): void {
    this.mesos = this.calendariService.generarAnyComplet(this.anyActual);
  }

  /**
   * Obté el nom del mes per un índex
   */
  getNomMes(index: number): string {
    return this.calendariService.getNomMes(index);
  }

  /**
   * Part 2 i 3: Aquesta funció es crida quan canvien els valors del formulari
   */
  onConfiguracioCanviada(event: any): void {
    this.calcularPeriode(event.dataInici, event.horesTotals, event.horesDiaries);
  }

  /**
   * Calcula el període de pràctiques i marca els dies al calendari
   */
  calcularPeriode(dataInicial: Date, horesTotals: number, horesDiaries: number): void {
    // 1. Calcular dies laborables i data final
    const resultat = this.calendarioService.calcularPeriodoPractiques({
      dataInici: dataInicial.toISOString().split('T')[0],
      horesTotals,
      horesDiaries
    });

    // 2. Actualitzar periodePractiques
    this.periodePractiques = {
      dataInicial,
      dataFinal: resultat.dataFinal,
      horesTotals,
      horesDiaries,
      diesLaborables: resultat.diesLectius
    };

    // 3. Regenerar calendari
    this.carregarCalendari();

    // 4. Marcar els dies de pràctiques
    this.marcarDiesPractiques(dataInicial, resultat.dataFinal);
  }

  /**
   * Part 3: Marca tots els dies del calendari que estan dins del període de pràctiques
   */
  private marcarDiesPractiques(dataInicial: Date, dataFinal: Date): void {
    this.calendariService.marcarDiesPractiques(this.mesos, dataInicial, dataFinal);
  }

  /**
   * Obté les classes CSS per un dia
   */
  getClassesDia(dia: DiaCalendari): string {
    const classes = ['dia'];

    if (!dia.esDinsDelMes) classes.push('fora-mes');
    if (dia.esCapDeSetmana) classes.push('cap-setmana');
    if (dia.esFestiu) classes.push('festiu');
    if (dia.esDiaPractiques) classes.push('dia-practiques');

    return classes.join(' ');
  }
}
