import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarioService } from '../../shared/services/calendario.service';
import { Configuracion } from '../../core/models/configuracion.interface';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './configuracion.html',
  styleUrls: ['./configuracion.css']
})
export class ConfiguracionComponent implements OnInit {
  configuracionForm: FormGroup;
  dataFinal: string = '';
  diesLectius: number = 0;
  horesReals: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private calendarioService: CalendarioService
  ) {
    // Fechas
    const hoy = new Date();
    const fechaFormato = hoy.toISOString().split('T')[0];

    this.configuracionForm = this.formBuilder.group({
      dataInici: [fechaFormato, Validators.required],
      horesTotals: [400, [
        Validators.required,
        Validators.min(0.1),
        Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)
      ]],
      horesDiaries: [8, [
        Validators.required,
        Validators.min(0.1),
        Validators.max(24),
        Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)
      ]]
    });
  }

  ngOnInit(): void {
    this.calcularDatos();

    this.configuracionForm.valueChanges.subscribe(() => {
      this.calcularDatos();
    });
  }

  getDataIniciFormatted(): string {
    const dataInici = this.configuracionForm.get('dataInici')?.value;
    if (!dataInici) return '';

    const fecha = new Date(dataInici);
    return this.calendarioService.formatearFechaCatalan(fecha);
  }

  calcularDatos(): void {
    if (this.configuracionForm.invalid) {
      return;
    }

    try {
      const config: Configuracion = this.configuracionForm.value;
      const resultat = this.calendarioService.calcularPeriodoPractiques(config);

      this.diesLectius = resultat.diesLectius;
      this.horesReals = resultat.horesReals;
      this.dataFinal = this.calendarioService.formatearFechaCatalan(resultat.dataFinal);
    } catch (error) {
      console.error('Error al calcular:', error);
    }
  }
}
