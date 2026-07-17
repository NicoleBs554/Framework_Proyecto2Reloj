import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-solar-lunar',
  imports: [CommonModule],
  template: `
    <div class="scene" [class.night]="isNight">
      <div class="sky"></div>
      <div class="ground"></div>
      <div class="celestial" [ngClass]="{sun: !isNight, moon: isNight}" [style.transform]="transform"></div>
      <div class="stars" *ngIf="isNight">
        <span *ngFor="let star of stars; let i = index" [style.left.%]="star.x" [style.top.%]="star.y" [style.opacity]="star.opacity"></span>
      </div>
      <div class="label">Sol y Luna — ciclo día/noche</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:320px;height:320px;border-radius:28px;overflow:hidden;background:#91d1ff;box-shadow:0 20px 45px rgba(0,0,0,0.18);}
     .sky{position:absolute;inset:0;background:linear-gradient(180deg,#a8ddff 0%,#4a95e8 60%,#24477c 100%);transition:background 0.5s ease;}
     .scene.night .sky{background:linear-gradient(180deg,#0c1f3f 0%,#132c53 55%,#0b1632 100%);}
     .ground{position:absolute;left:0;right:0;bottom:0;height:26%;background:radial-gradient(circle at center,rgba(72,190,255,0.25),transparent 60%);}
     .celestial{position:absolute;width:80px;height:80px;border-radius:50%;top:20%;left:50%;transform:translateX(-50%);transition:transform 0.2s ease,background 0.2s ease,box-shadow 0.2s ease;}
     .celestial.sun{background:radial-gradient(circle,#fff48c 0%,#ffdb4d 50%,#ffbe00 100%);box-shadow:0 0 40px rgba(255,221,80,0.55);}
     .celestial.moon{background:radial-gradient(circle,#f3f7ff 0%,#c9d8f5 70%,#7f9ed6 100%);box-shadow:0 0 30px rgba(195,214,255,0.55);}
     .stars{position:absolute;inset:0;pointer-events:none;}
     .stars span{position:absolute;width:4px;height:4px;border-radius:50%;background:#fff;animation:twinkle 2s infinite ease-in-out;}
     .scene.night .stars span{background:#e7f2ff;}
     .label{position:absolute;left:0;right:0;bottom:0;padding:0.8rem 1rem;color:#f1f7ff;text-align:center;font-size:0.95rem;}
     @keyframes twinkle{0%,100%{opacity:0.2;}50%{opacity:1;}}
    `
  ]
})
export class SolarLunarComponent implements OnDestroy {
  isNight = false;
  transform = 'translateX(-50%) translateY(0px)';
  stars = Array.from({ length: 20 }, () => ({ x: Math.random() * 90, y: Math.random() * 55 + 5, opacity: 0.5 + Math.random() * 0.5 }));
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    this.isNight = h < 6 || h >= 18;
    const dayProgress = ((h % 12) * 60 + m + s / 60) / 720;
    const angle = (dayProgress * 180) - 90;
    const radius = 100;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    this.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
    this.stars = this.stars.map((star, index) => ({
      ...star,
      opacity: 0.4 + 0.6 * Math.abs(Math.sin((s + index * 3) * Math.PI / 30))
    }));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
