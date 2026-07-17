import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeService } from '../time.service';
import { HeaderComponent } from '../header.component';
import { DigitalClockComponent } from './digital-clock.component';
import { AnalogClockComponent } from './analog-clock.component';
import { HourglassComponent } from './hourglass.component';
import { DayProgressComponent } from './day-progress.component';
import { SunPositionComponent } from './sun-position.component';
import { PendulumComponent } from './pendulum.component';
import { CandleComponent } from './candle.component';
import { CircularRingsComponent } from './circular-rings.component';
import { BinaryClockComponent } from './binary-clock.component';
import { WaveformComponent } from './waveform.component';
import { SpiralComponent } from './spiral.component';

const VISUALS = [
  'digital', 'analog', 'hourglass', 'day-progress', 'sun', 'pendulum', 'candle', 'rings', 'binary', 'waveform','spiral'
];

@Component({
  standalone: true,
  selector: 'app-main-visualizer',
  imports: [CommonModule, FormsModule, HeaderComponent,
    DigitalClockComponent, AnalogClockComponent, HourglassComponent, DayProgressComponent,
    SunPositionComponent, PendulumComponent, CandleComponent, CircularRingsComponent,
    BinaryClockComponent, WaveformComponent, SpiralComponent
  ],
  template: `
    <app-header></app-header>
    <main class="wrap">
      <div class="controls">
        <label>Visualizador
          <select [(ngModel)]="selected">
            <option *ngFor="let v of visuals" [value]="v">{{v}}</option>
          </select>
        </label>
        <label>Slider demo (seconds of day)
          <input type="range" min="0" max="86400" step="1" [(ngModel)]="sliderSeconds" (input)="onSlider()"/>
        </label>
        <label>Velocidad
          <input type="range" min="0" max="8" step="0.1" [(ngModel)]="speed" (input)="onSpeed()"/>
        </label>
        <button (click)="toggleRunning()">{{running? 'Pausar':'Reanudar'}}</button>
        <button (click)="resetToNow()">Ahora</button>
      </div>

      <section class="visual">
        <ng-container [ngSwitch]="selected">
          <app-digital-clock *ngSwitchCase="'digital'" [time]="time"></app-digital-clock>
          <app-analog-clock *ngSwitchCase="'analog'" [time]="time"></app-analog-clock>
          <app-hourglass *ngSwitchCase="'hourglass'" [time]="time"></app-hourglass>
          <app-day-progress *ngSwitchCase="'day-progress'" [time]="time"></app-day-progress>
          <app-sun-position *ngSwitchCase="'sun'" [time]="time"></app-sun-position>
          <app-pendulum *ngSwitchCase="'pendulum'" [time]="time"></app-pendulum>
          <app-candle *ngSwitchCase="'candle'" [time]="time"></app-candle>
          <app-circular-rings *ngSwitchCase="'rings'" [time]="time"></app-circular-rings>
          <app-binary-clock *ngSwitchCase="'binary'" [time]="time"></app-binary-clock>
          <app-waveform *ngSwitchCase="'waveform'" [time]="time"></app-waveform>
          <app-spiral *ngSwitchCase="'spiral'" [time]="time"></app-spiral>
        </ng-container>
      </section>
    </main>
  `,
  styles: [`.wrap{padding:1rem}.controls{display:flex;gap:0.8rem;flex-wrap:wrap;align-items:center}.visual{margin-top:1rem;display:flex;justify-content:center;align-items:center;height:60vh;border:1px solid #eee;border-radius:8px;padding:1rem}`]
})
export class MainVisualizerComponent implements OnDestroy{
  visuals = VISUALS;
  selected = 'digital';
  sliderSeconds = 0;
  speed = 1;
  running = true;
  time = new Date();
  private sub: any;
  constructor(private ts: TimeService){
    this.sub = this.ts.time$.subscribe(t=>{ this.time = t; this.sliderSeconds = (t.getHours()*3600 + t.getMinutes()*60 + t.getSeconds()); });
    this.ts.setSimulatedSeconds(null);
  }
  onSlider(){ this.ts.setSimulatedSeconds(this.sliderSeconds); }
  onSpeed(){ this.ts.setSpeed(this.speed); }
  toggleRunning(){ this.running = !this.running; this.running ? this.ts.resume() : this.ts.pause(); }
  resetToNow(){ this.ts.setSimulatedSeconds(null); }
  ngOnDestroy(){ if(this.sub) this.sub.unsubscribe(); }
}
