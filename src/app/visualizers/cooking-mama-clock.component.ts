import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';

@Component({
  standalone: true,
  selector: 'app-cooking-mama-clock',
  imports: [CommonModule],
  template: `
    <div class="scene">
      <div class="kitchen">
        <div class="pot">
          <div class="broth" [style.height.%]="brothLevel"></div>
          <div *ngFor="let bubble of bubbles" class="bubble" [style.left.%]="bubble.x" [style.bottom.%]="bubble.y"></div>
        </div>
        <div class="cutting-board">
          <div *ngFor="let slice of slices; let i = index" class="slice" [class.cut]="i < slicedCount"></div>
        </div>
      </div>
      <div class="label">Cooking Mama — cocina en tiempo real</div>
    </div>
  `,
  styles: [
    `.scene{position:relative;width:340px;height:320px;border-radius:28px;background:#f7f1e8;box-shadow:0 20px 48px rgba(0,0,0,0.15);padding:1rem;overflow:hidden;}
     .kitchen{position:relative;width:100%;height:100%;}
     .pot{position:absolute;left:20%;top:20%;width:160px;height:140px;background:#5b3c5b;border-radius:80px 80px 28px 28px;overflow:hidden;border:8px solid #8c5f8c;}
     .pot::before{content:'';position:absolute;top:-18px;left:20px;width:120px;height:26px;background:#8c5f8c;border-radius:14px;}
     .broth{position:absolute;left:16px;right:16px;bottom:12px;background:linear-gradient(180deg,#fef3d6,#f5a66d);transition:height 0.2s ease;}
     .bubble{position:absolute;width:14px;height:14px;background:rgba(255,255,255,0.85);border-radius:50%;box-shadow:0 0 8px rgba(255,255,255,0.6);animation:bubble 3s infinite ease-in;
     }
     .cutting-board{position:absolute;bottom:18px;right:18px;width:130px;height:100px;background:#deb98e;border-radius:16px;display:grid;grid-template-columns:repeat(6,1fr);grid-gap:6px;padding:10px;}
     .slice{width:100%;height:18px;background:#ffb86b;border-radius:6px;opacity:0.3;}
     .slice.cut{background:#ff7a3b;opacity:1;}
     .label{position:absolute;left:0;right:0;bottom:12px;text-align:center;color:#7c5a3b;font-size:0.95rem;}
     @keyframes bubble{0%{transform:translateY(0) scale(0.8);opacity:0.2;}50%{transform:translateY(24px) scale(1);opacity:0.9;}100%{transform:translateY(48px) scale(0.7);opacity:0;}}
    `
  ]
})
export class CookingMamaClockComponent implements OnDestroy {
  brothLevel = 40;
  bubbles = Array.from({ length: 6 }, () => ({ x: 20 + Math.random() * 60, y: 20 + Math.random() * 40 }));
  slices = Array.from({ length: 60 }, () => false);
  slicedCount = 0;
  private sub: Subscription;

  constructor(private ts: TimeService) {
    this.sub = this.ts.time$.subscribe((time) => this.update(time));
  }

  private update(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    this.brothLevel = 30 + (h / 23) * 55;
    this.slicedCount = m;
    this.slices = this.slices.map((_, i) => i < this.slicedCount);
    this.bubbles = this.bubbles.map((bubble, index) => ({
      ...bubble,
      y: 18 + ((s + index * 6) % 60) / 60 * 50
    }));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
