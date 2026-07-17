import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-pacman-clock',
  imports: [CommonModule],
  template: `
    <div class="scene">
      <div class="maze" [ngClass]="mazeStyle">
        <div class="fruits">{{ fruitIcon }}</div>
        <div class="track">
          <div *ngFor="let pellet of pellets; let i = index" class="pellet" [class.eaten]="i < eatenCount"></div>
        </div>
        <div class="pacman" [style.left.%]="pacmanX" [style.animation-duration]="mouthSpeed + 's'"></div>
        <div class="ghost" [style.left.%]="ghostX"></div>
      </div>
      <div class="label">Pac-Man Retro — laberinto del tiempo</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:340px;height:300px;border-radius:28px;background:#030a16;box-shadow:0 20px 50px rgba(0,0,0,0.55);padding:1rem;}
     .maze{position:relative;width:100%;height:100%;background:#07152b;border-radius:24px;overflow:hidden;}
     .maze.subway{background:#211e44;}
     .maze.castle{background:#2e1728;}
     .fruits{position:absolute;top:16px;left:16px;color:#fff;font-size:1.4rem;}
     .track{position:absolute;left:8%;right:8%;top:70px;height:42px;display:flex;align-items:center;justify-content:space-between;}
     .pellet{width:10px;height:10px;border-radius:50%;background:#ffdd57;opacity:0.35;}
     .pellet.eaten{background:transparent;box-shadow:none;opacity:0;}
     .pacman{position:absolute;top:64px;width:34px;height:34px;border-radius:50%;background:conic-gradient(from 45deg at 50% 50%,#ffd93b 0 270deg,transparent 270deg 360deg);animation:chomp linear infinite;}
     .ghost{position:absolute;top:74px;width:30px;height:30px;background:#ff3d5a;border-radius:50% 50% 0 0;box-shadow:0 0 0 8px rgba(255,255,255,0.08);}
     .ghost::after{content:'';position:absolute;bottom:-6px;left:0;width:100%;height:12px;background:linear-gradient(90deg,#ff3d5a 0%,#b8002f 100%);border-radius:0 0 50% 50%;}
     .label{position:absolute;left:0;right:0;bottom:14px;text-align:center;color:#aed7ff;font-size:0.95rem;}
     @keyframes chomp{0%,100%{transform:rotate(0deg);}50%{transform:rotate(10deg);}}
    `
  ]
})
export class PacmanClockComponent implements OnDestroy {
  pellets = Array.from({ length: 60 }, () => false);
  eatenCount = 0;
  pacmanX = 0;
  ghostX = 0;
  fruitIcon = '🍒';
  mouthSpeed = 0.5;
  mazeStyle = '';
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    this.eatenCount = Math.min(60, m);
    this.pacmanX = 8 + (m / 59) * 84;
    this.ghostX = 6 + (m / 59) * 82 - (s / 59) * 4;
    if (h < 12) {
      this.mazeStyle = '';
      this.fruitIcon = '🍒';
    } else if (h < 18) {
      this.mazeStyle = 'subway';
      this.fruitIcon = '🍓';
    } else {
      this.mazeStyle = 'castle';
      this.fruitIcon = '🔑';
    }
    this.pellets = this.pellets.map((_, i) => i < this.eatenCount);
    this.mouthSpeed = 0.6 - (s / 59) * 0.3;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
