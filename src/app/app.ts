import { Component } from '@angular/core';
import { CalendariComponent } from './components/calendari/calendari';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendariComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'calendario-fempo';
}
