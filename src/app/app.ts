import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainVisualizerComponent } from './shared/components/main-visualizer/main-visualizer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainVisualizerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App AppComponent{
  protected readonly title = signal('ProyectoAngular');
}
