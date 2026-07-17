import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-mario-clock',
  imports: [CommonModule],
  template: `
    <div class="scene">
      <div class="sky" [ngClass]="levelStyle"></div>
      <div class="ground"></div>
      <div class="block-row">
        <div *ngFor="let block of blocks" class="block" [class.hit]="block.hit"></div>
      </div>
      <div class="mario" [style.left.%]="marioPosition" [class.jump]="jump"></div>
      <div class="goomba" [style.left.%]="goombaPosition"></div>
      <div class="label">Retro Cuadritos — hora pixelada</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:340px;height:280px;border-radius:24px;overflow:hidden;background:#74b9ff;box-shadow:0 18px 48px rgba(0,0,0,0.18);}
     .sky{position:absolute;inset:0;background:#7ec0ff;transition:background 0.3s ease;}
     .sky.subway{background:#2f2b45;}
     .sky.castle{background:#2b1f32;}
     .ground{position:absolute;bottom:0;left:0;right:0;height:72px;background:repeating-linear-gradient(90deg,#8b5e34 0 16px,#a56a3a 16px 32px);}
     .block-row{position:absolute;bottom:92px;left:10%;right:10%;display:grid;grid-template-columns:repeat(15,1fr);gap:6px;}
     .block{width:100%;aspect-ratio:1/1;background:#e9c46a;border:2px solid #a05c2a;box-shadow:inset 0 0 0 2px rgba(255,255,255,0.25);}
     .block.hit{background:#f4d35e;box-shadow:inset 0 0 0 2px rgba(255,255,255,0.35);}
     .mario{position:absolute;bottom:92px;width:32px;height:40px;background:linear-gradient(180deg,#ff4d4d 0%,#aa1c1c 100%);border-radius:8px;transition:left 0.25s ease;}
     .mario.jump{animation:jump 0.6s ease-in-out infinite alternate;}
     .goomba{position:absolute;bottom:80px;width:28px;height:24px;background:#6d2f1c;border-radius:16px 16px 12px 12px;box-shadow:inset 0 4px 0 rgba(0,0,0,0.2);animation:walk 1s steps(2) infinite;}
     .label{position:absolute;left:0;right:0;bottom:10px;text-align:center;color:#ffffff;font-family:monospace;font-size:0.95rem;text-shadow:0 1px 2px rgba(0,0,0,0.5);}
     @keyframes jump{to{transform:translateY(-20px);}}
     @keyframes walk{0%,100%{transform:translateX(0);}50%{transform:translateX(2px);}}
    `
  ]
})
export class MarioClockComponent implements OnDestroy {
  levelStyle = '';  
  blocks = Array.from({ length: 15 }, () => ({ hit: false }));
  marioPosition = 0;
  goombaPosition = 90;
  jump = false;
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    if (h < 12) {
      this.levelStyle = '';
    } else if (h < 18) {
      this.levelStyle = 'subway';
    } else {
      this.levelStyle = 'castle';
    }
    const progress = m / 59;
    this.marioPosition = 8 + progress * 84;
    this.blocks = this.blocks.map((b, index) => ({ hit: index < Math.floor(progress * 15) }));
    this.goombaPosition = 90 - (s / 59) * 20;
    this.jump = s % 2 === 0;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
