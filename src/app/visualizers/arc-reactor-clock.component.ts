import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-arc-reactor-clock',
  imports: [CommonModule],
  template: `
    <div class="scene">
      <div class="outer-ring">
        <div *ngFor="let sector of sectors; let i = index" class="sector" [style.opacity]="sector"></div>
      </div>
      <div class="inner-ring" [style.transform]="innerRotation"></div>
      <div class="core" [style.boxShadow]="coreGlow"></div>
      <div class="label">Reactor Arc — pulso energético</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:320px;height:320px;border-radius:30px;background:#04090f;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 70px rgba(0,0,0,0.55);}
     .outer-ring{position:absolute;width:240px;height:240px;border-radius:50%;display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(12,1fr);gap:4px;align-items:center;justify-items:center;}
     .sector{width:18px;height:36px;background:linear-gradient(180deg,#25d9ff,#0a78ff);border-radius:10px;}
     .inner-ring{position:absolute;width:160px;height:160px;border-radius:50%;border:2px solid rgba(46,228,255,0.35);box-shadow:0 0 40px rgba(46,228,255,0.18);}
     .core{position:absolute;width:100px;height:100px;border-radius:50%;background:radial-gradient(circle,#c7f3ff 0%,#0d8df4 70%,#0c2c6c 100%);}
     .label{position:absolute;bottom:18px;color:#b4dfff;font-size:0.94rem;text-align:center;width:100%;}
    `
  ]
})
export class ArcReactorClockComponent implements OnDestroy {
  sectors = Array.from({ length: 24 }, () => 0.15);
  innerRotation = 'rotate(0deg)';
  coreGlow = '0 0 40px rgba(34,189,255,0.45), inset 0 0 20px rgba(34,189,255,0.55)';
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    this.sectors = this.sectors.map((_, i) => (i < h ? 1 : 0.18));
    this.innerRotation = `rotate(${(m / 60) * 360}deg)`;
    const pulse = 1 + 0.12 * Math.sin((s / 60) * Math.PI * 2);
    this.coreGlow = `0 0 ${30 * pulse}px rgba(34,189,255,0.45), inset 0 0 ${12 * pulse}px rgba(34,189,255,0.65)`;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
