import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-monster-high-clock',
  imports: [CommonModule],
  template: `
    <div class="scene">
      <div class="background"></div>
      <div class="candles">
        <div class="candle" *ngFor="let candle of candles" [class.small]="candle.size === 'small'">
          <div class="skull"></div>
          <div class="wax" [style.height.%]="candle.height"></div>
          <div class="flame" [style.animation-duration]="candle.flameSpeed + 's'"></div>
        </div>
      </div>
      <div class="label">Monster High — velas góticas</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:320px;height:320px;background:#110816;border-radius:24px;overflow:hidden;box-shadow:0 18px 48px rgba(0,0,0,0.45);padding:1rem;}
     .background{position:absolute;inset:0;background:radial-gradient(circle at top,#3b1b50 0%,#0b0411 60%);}
     .candles{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);display:flex;gap:22px;}
     .candle{position:relative;width:62px;height:180px;background:linear-gradient(180deg,#321d3c 0%,#1d0b1d 100%);border-radius:24px 24px 12px 12px;overflow:hidden;box-shadow:0 0 0 2px rgba(255,255,255,0.05);}
     .candle.small{height:160px;width:52px;}
     .skull{position:absolute;top:16px;left:50%;width:32px;height:22px;transform:translateX(-50%);background:#f6f0ff;border-radius:50% 50% 40% 40%;border:2px solid #d8c2ff;}
     .skull::before{content:'';position:absolute;left:50%;top:8px;width:6px;height:6px;background:#381e3c;border-radius:50%;transform:translateX(-110%);} 
     .skull::after{content:'';position:absolute;left:50%;top:8px;width:6px;height:6px;background:#381e3c;border-radius:50%;transform:translateX(10%);}
     .wax{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:50%;background:linear-gradient(180deg,#f6d3ff 0%,#9d6cff 100%);border-radius:16px 16px 0 0;}
     .flame{position:absolute;top:6px;left:50%;width:18px;height:32px;transform:translateX(-50%);background:radial-gradient(circle at 50% 20%,#fff1b8 0%,#f9a4ff 40%,#a84cff 80%);border-radius:50%;box-shadow:0 0 20px rgba(255,123,234,0.65);animation:flame 1s infinite ease-in-out;}
     .label{position:absolute;left:0;right:0;bottom:10px;text-align:center;color:#f0c2ff;font-size:0.95rem;font-family:system-ui, sans-serif;}
     @keyframes flame{0%,100%{transform:translate(-50%,0) scaleY(1);}50%{transform:translate(-50%, -6px) scaleY(0.95);}}
    `
  ]
})
export class MonsterHighClockComponent implements OnDestroy {
  candles = [
    { height: 100, flameSpeed: 1.1, size: 'large' },
    { height: 100, flameSpeed: 0.9, size: 'large' },
    { height: 100, flameSpeed: 0.7, size: 'small' }
  ];
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    this.candles[0].height = 100 - (h / 23) * 100;
    this.candles[1].height = 100 - (m / 59) * 100;
    this.candles[2].height = 100 - (s / 59) * 100;
    this.candles = this.candles.map((c) => ({
      ...c,
      height: c.height <= 0 ? 100 : c.height,
      flameSpeed: c.flameSpeed
    }));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
