import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-futuristic-clock',
  imports: [CommonModule],
  template: `
    <div class="scene">
      <div class="background"></div>
      <svg viewBox="0 0 220 220" class="reactor">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#93ffff" stop-opacity="1" />
            <stop offset="80%" stop-color="#9451ff" stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle cx="110" cy="110" r="96" fill="rgba(10,14,22,0.9)" stroke="#19202d" stroke-width="3"></circle>
        <circle cx="110" cy="110" r="72" fill="rgba(0,0,0,0.2)" stroke="#67f2ff" stroke-width="2"></circle>
        <circle cx="110" cy="110" r="70" fill="url(#glow)" [style.transform]="'scale(' + secondPulse + ')'" [style.transform-origin]="'110px 110px'"></circle>
        <circle cx="110" cy="110" r="48" fill="#0c2235" stroke="#7cebff" stroke-width="4" opacity="0.8"></circle>
        <circle cx="110" cy="110" r="70" fill="none" stroke="#f050ff" stroke-width="8" stroke-linecap="round" stroke-dasharray="440" [attr.stroke-dashoffset]="minuteDash"></circle>
        <g class="gear" [style.transform]="'rotate(' + hourAngle + 'deg)'" style="transform-origin:110px 110px;">
          <circle cx="110" cy="110" r="28" fill="#10233d" stroke="#77e0ff" stroke-width="3"></circle>
          <g *ngFor="let tooth of gearTeeth; let i = index" [attr.transform]="'rotate(' + (i*30) + ' 110 110)'">
            <rect x="108" y="46" width="4" height="14" rx="2" fill="#7be2ff"></rect>
          </g>
        </g>
        <g [attr.transform]="'rotate(' + hourAngle + ' 110 110)'">
          <rect x="109" y="40" width="2" height="72" rx="1" fill="#b3e9ff"></rect>
        </g>
      </svg>
      <div class="label">Analógico Futurista — Energía en movimiento</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:320px;height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;}
     .background{position:absolute;inset:0;background:radial-gradient(circle at center,rgba(53,67,105,0.45),#070a14 55%);filter:blur(1px);}
     .reactor{width:280px;height:280px;z-index:1;}
     .gear rect{fill:#80f1ff;}
     .label{margin-top:1rem;color:#c8d4ff;text-align:center;font-size:0.95rem;font-family:system-ui, sans-serif;}
    `
  ]
})
export class FuturisticClockComponent implements OnDestroy {
  hourAngle = 0;
  minuteDash = 440;
  secondPulse = 1;
  gearTeeth = Array.from({ length: 12 });
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const minuteFraction = minutes / 60;
    this.hourAngle = hours * 30 + minuteFraction * 30;
    this.minuteDash = 440 - 440 * minuteFraction;
    this.secondPulse = 1 + 0.03 * Math.sin((seconds / 60) * Math.PI * 2);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
