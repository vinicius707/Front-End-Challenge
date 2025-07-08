import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // standalone: true, // Removido para uso tradicional
  // imports: [RouterOutlet], // Removido para uso tradicional
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front-end-challenge';
}
