import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-star-wars-clock',
  imports: [CommonModule],
  template: `
    <div class="scene">
      <div class="stars">
        <span *ngFor="let star of stars" [style.left.%]="star.x" [style.top.%]="star.y" [style.opacity]="star.opacity"></span>
      </div>
      <div class="superlaser">
        <div class="beam" [style.width.%]="laserWidth"></div>
      </div>
      <div class="sabers">
        <div class="saber blue" [style.height.%]="saberLength"></div>
        <div class="saber red" [style.height.%]="saberLength"></div>
      </div>
      <div class="label">Star Wars — hiperespacio y sables</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:320px;height:320px;border-radius:28px;background:#050815;overflow:hidden;box-shadow:0 22px 60px rgba(0,0,0,0.5);}
     .stars{position:absolute;inset:0;}
     .stars span{position:absolute;width:2px;height:12px;background:#fff;opacity:0.2;border-radius:999px;box-shadow:0 0 8px rgba(255,255,255,0.7);animation:warp 1s linear infinite;}
     .superlaser{position:absolute;top:52%;left:50%;width:220px;height:16px;transform:translateX(-50%);background:rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;}
     .beam{height:100%;background:linear-gradient(90deg,rgba(253,203,110,0.95),rgba(255,255,255,0.1));transition:width 0.2s ease;}
     .sabers{position:absolute;bottom:24px;left:50%;width:180px;height:220px;transform:translateX(-50%);display:flex;justify-content:space-between;}
     .saber{width:10px;border-radius:999px;box-shadow:0 0 18px rgba(255,255,255,0.55);transform-origin:bottom center;}
     .saber.blue{background:linear-gradient(180deg,#85d4ff 0%,#1a88ff 100%);transform:rotate(20deg);}
     .saber.red{background:linear-gradient(180deg,#ff6a83 0%,#d21839 100%);transform:rotate(-20deg);}
     .label{position:absolute;left:0;right:0;bottom:12px;color:#cdd7ff;text-align:center;font-size:0.95rem;}
     @keyframes warp{0%{transform:translateY(0);}100%{transform:translateY(260px);}}
    `
  ]
})
export class StarWarsClockComponent implements OnDestroy {
  stars = Array.from({ length: 30 }, () => ({ x: Math.random() * 100, y: Math.random() * 100, opacity: 0.2 + Math.random() * 0.7 }));
  laserWidth = 0;
  saberLength = 0;
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    this.saberLength = ((h % 12) / 12) * 100;
    this.laserWidth = (m / 59) * 100;
    this.stars = this.stars.map((star, index) => ({
      ...star,
      opacity: 0.2 + 0.6 * Math.abs(Math.sin(((s + index * 2) / 60) * Math.PI * 2))
    }));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
