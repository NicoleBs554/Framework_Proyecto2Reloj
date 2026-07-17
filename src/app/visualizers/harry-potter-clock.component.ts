import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-harry-potter-clock',
  imports: [CommonModule],
  template: `
    <div class="scene">
      <div class="hourglass">
        <div class="sand top" [style.height.%]="100 - upperFill"></div>
        <div class="sand bottom" [style.height.%]="lowerFill"></div>
      </div>
      <div class="snitch" [style.transform]="snitchTransform"></div>
      <div class="wand" [class.spark]="sparkActive"></div>
      <div class="label">Harry Potter — reloj de arena mágico</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:320px;height:320px;background:#1a1a1f;border-radius:26px;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,0.4);}
     .hourglass{position:absolute;left:50%;top:24%;width:140px;height:200px;transform:translateX(-50%);border:5px solid #7f6b47;border-radius:24px;box-shadow:0 0 0 1px rgba(255,255,255,0.08);}
     .hourglass::before,.hourglass::after{content:'';position:absolute;left:50%;width:92px;height:92px;border-radius:50%;border:4px solid #7f6b47;transform:translateX(-50%);}
     .hourglass::before{top:-44px;}
     .hourglass::after{bottom:-44px;}
     .sand{position:absolute;left:50%;width:80px;transform:translateX(-50%);background:linear-gradient(180deg,#f0c75e,#b0701e);border-radius:40px;transition:height 0.2s ease;}
     .sand.top{top:44px;}
     .sand.bottom{bottom:44px;}
     .snitch{position:absolute;top:16%;left:75%;width:28px;height:28px;background:radial-gradient(circle,#ffea7d 0%,#f5b400 70%);border-radius:50%;box-shadow:0 0 30px rgba(255,234,125,0.7);}
     .snitch::before,.snitch::after{content:'';position:absolute;top:50%;width:46px;height:8px;background:linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0));border-radius:999px;transform:translateY(-50%);}
     .snitch::before{left:-44px;}
     .snitch::after{right:-44px;transform:translateY(-50%) rotate(180deg);}
     .wand{position:absolute;bottom:18px;left:18px;width:12px;height:90px;background:linear-gradient(180deg,#b39f7c,#392b16);border-radius:6px;box-shadow:0 0 10px rgba(255,255,180,0.15);}
     .wand.spark::after{content:'';position:absolute;top:-18px;left:-10px;width:36px;height:36px;border-radius:50%;background:radial-gradient(circle,#fff9c4 0%,rgba(255,255,167,0) 70%);animation:spark 1s infinite ease-in-out;}
     .label{position:absolute;left:0;right:0;bottom:12px;text-align:center;color:#f3e1b8;font-size:0.95rem;font-family:serif;}
     @keyframes spark{0%,100%{transform:scale(0.9);opacity:0.5;}50%{transform:scale(1.2);opacity:1;}}
    `
  ]
})
export class HarryPotterClockComponent implements OnDestroy {
  upperFill = 50;
  lowerFill = 50;
  snitchTransform = 'translateX(0) translateY(0)';
  sparkActive = false;
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    const totalHours = h + m / 60;
    this.lowerFill = Math.min(100, Math.max(0, (totalHours / 24) * 100));
    this.upperFill = 100 - this.lowerFill;
    const angle = (m / 60) * 360;
    const radius = 60;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    this.snitchTransform = `translate(${x}px, ${y}px)`;
    this.sparkActive = s % 2 === 0;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
