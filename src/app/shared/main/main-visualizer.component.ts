import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TimeService } from '../../../core/services/time.service';

// Importa tus 11 visualizadores
import { FuturisticClockComponent } from '../../../features/relojes/futuristic-clock/futuristic-clock.component';
import { SolarLunarComponent } from '../../../features/relojes/solar-lunar/solar-lunar.component';
import { MarioClockComponent } from '../../../features/relojes/mario-clock/mario-clock.component';
import { BarbieClockComponent } from '../../../features/relojes/barbie-clock/barbie-clock.component';
import { MonsterHighClockComponent } from '../../../features/relojes/monster-high-clock/monster-high-clock.component';
import { HarryPotterClockComponent } from '../../../features/relojes/harry-potter-clock/harry-potter-clock.component';
import { ArcReactorClockComponent } from '../../../features/relojes/arc-reactor-clock/arc-reactor-clock.component';
import { StarWarsClockComponent } from '../../../features/relojes/star-wars-clock/star-wars-clock.component';
import { PacmanClockComponent } from '../../../features/relojes/pacman-clock/pacman-clock.component';
import { CookingMamaClockComponent } from '../../../features/relojes/cooking-mama-clock/cooking-mama-clock.component';
import { SpiralComponent } from '../../../features/relojes/spiral/spiral.component';

@Component({
  selector: 'app-main-visualizer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Todos los componentes de relojes
    FuturisticClockComponent,
    SolarLunarComponent,
    MarioClockComponent,
    BarbieClockComponent,
    MonsterHighClockComponent,
    HarryPotterClockComponent,
    ArcReactorClockComponent,
    StarWarsClockComponent,
    PacmanClockComponent,
    CookingMamaClockComponent,
    SpiralComponent
  ],
  templateUrl: './main-visualizer.component.html',
  styleUrls: ['./main-visualizer.component.css']
})
export class MainVisualizerComponent implements OnInit, OnDestroy {
  selectedClock = 'futuristic';
  currentTime = new Date();
  private timeSubscription!: Subscription;

  // Variables para el modo demo / slider
  isDemoMode = false;
  sliderValue = 43200; // 12:00 PM en segundos (por defecto)

  clockOptions = [
    { label: '⚡ Analógico Futurista', value: 'futuristic' },
    { label: '☀️ Sol / Luna', value: 'solar' },
    { label: '🍄 Mario Bros', value: 'mario' },
    { label: '🎀 Barbie World', value: 'barbie' },
    { label: '💀 Monster High', value: 'monster' },
    { label: '⚡ Harry Potter', value: 'harry' },
    { label: '🔵 Marvel Arc Reactor', value: 'arc' },
    { label: '🚀 Star Wars', value: 'starwars' },
    { label: '👾 Pac-Man', value: 'pacman' },
    { label: '🍳 Cooking Mama', value: 'cooking' },
    { label: '🌀 Espiral', value: 'spiral' }
  ];

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    // Suscribirse al tiempo central
    this.timeSubscription = this.timeService.time$.subscribe((t: Date) => {
      this.currentTime = t;
    });
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  // Cambiar entre tiempo real y modo demo
  toggleDemoMode() {
    this.isDemoMode = !this.isDemoMode;
    if (this.isDemoMode) {
      // Pausar el tiempo real y usar el valor del slider
      this.timeService.pause();
      this.timeService.setSimulatedSeconds(this.sliderValue);
    } else {
      // Volver al tiempo real
      this.timeService.resume();
      this.timeService.setSimulatedSeconds(null);
    }
  }

  // Cuando el usuario mueve el slider
  onSliderChange(value: number) {
    this.sliderValue = value;
    if (this.isDemoMode) {
      this.timeService.setSimulatedSeconds(value);
    }
  }

  // Formatear los segundos a HH:MM:SS para mostrar debajo del slider
  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
}