// shared/components/main-visualizer/main-visualizer.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TimeService } from '../../../core/services/time.service';

// Importar TODOS los visualizadores
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
  customHour = new Date().getHours() + new Date().getMinutes() / 60;
  currentTime = new Date();
  private timeSubscription!: Subscription;

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
    this.timeSubscription = this.timeService.time$.subscribe((t: Date) => {
      this.currentTime = t;
    });
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  onTimeChange() {
    const date = new Date();
    date.setHours(Math.floor(this.customHour));
    date.setMinutes((this.customHour % 1) * 60);
    date.setSeconds(0);
    this.currentTime = date;
  }

  onClockChange() {
    // El cambio ya se refleja por el ngModel
  }
}