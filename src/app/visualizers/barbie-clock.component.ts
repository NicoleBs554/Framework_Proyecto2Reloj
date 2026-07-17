import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-barbie-clock',
  imports: [CommonModule],
  template: `
    <div class="scene">
      <div class="frame"></div>
      <div class="mirror">
        <div class="pearls">
          <span *ngFor="let filled of pearls; let i = index" [class.filled]="filled"></span>
        </div>
        <div class="avatar" [ngClass]="outfit"></div>
        <div class="sparkle" *ngFor="let sparkle of sparkles" [style.left.%]="sparkle.x" [style.top.%]="sparkle.y"></div>
      </div>
      <div class="label">Barbie World — glamour rosa</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:320px;height:320px;padding:1rem;background:#fce4f3;border-radius:28px;box-shadow:0 24px 60px rgba(247,182,235,0.35);overflow:hidden;}
     .frame{position:absolute;inset:0;border:8px solid #f9c1dd;border-radius:2rem;box-shadow:0 0 0 4px rgba(255,255,255,0.5);}
     .mirror{position:relative;width:240px;height:240px;margin:0 auto;background:linear-gradient(180deg,#ffe9f5 0%,#ffe0f0 100%);border-radius:50%;box-shadow:inset 0 0 0 8px rgba(255,255,255,0.5);overflow:hidden;}
     .pearls{position:absolute;inset:auto 16px 0;display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding-top:12px;}
     .pearls span{width:12px;height:12px;border-radius:50%;background:#f7c4de;opacity:0.3;box-shadow:0 0 4px rgba(255,255,255,0.45);}
     .pearls span.filled{background:#ffd6e8;opacity:1;}
     .avatar{position:absolute;left:50%;top:50%;width:130px;height:170px;transform:translate(-50%,-50%);border-radius:80px 80px 50px 50px;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.55);transition:background 0.3s ease;}
     .avatar.morning{background:linear-gradient(180deg,#f9f0ff 0%,#ffb6e2 100%);}
     .avatar.evening{background:linear-gradient(180deg,#ffa1db 0%,#d387e4 100%);}
     .avatar.night{background:linear-gradient(180deg,#f8c7ff 0%,#b06fcb 100%);}
     .sparkle{position:absolute;width:12px;height:12px;border-radius:50%;background:radial-gradient(circle,#fff 0%,rgba(255,255,255,0) 70%);animation:glow 2s infinite ease-in-out;}
     .label{position:absolute;left:0;right:0;bottom:16px;text-align:center;color:#c865a3;font-family:serif;font-size:0.95rem;}
     @keyframes glow{0%,100%{transform:scale(0.8);opacity:0.35;}50%{transform:scale(1.2);opacity:1;}}
    `
  ]
})
export class BarbieClockComponent implements OnDestroy {
  outfit = 'morning';
  pearls = Array.from({ length: 60 }, (_, i) => i < 0);
  sparkles = Array.from({ length: 8 }, () => ({ x: Math.random() * 88 + 6, y: Math.random() * 88 + 6 }));
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    if (h < 12) {
      this.outfit = 'morning';
    } else if (h < 18) {
      this.outfit = 'evening';
    } else {
      this.outfit = 'night';
    }
    const fill = Math.floor((m / 59) * 60);
    this.pearls = this.pearls.map((_, i) => i < fill);
    this.sparkles = this.sparkles.map((sparkle, index) => ({
      ...sparkle,
      x: 10 + Math.sin((time.getSeconds() + index * 5) * Math.PI / 15) * 35 + 40,
      y: 15 + Math.cos((time.getSeconds() + index * 3) * Math.PI / 18) * 32 + 30
    }));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
