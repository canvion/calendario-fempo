import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfiguracionComponent } from './components/configuracion/configuracion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfiguracionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'calendario-fempo';
}
