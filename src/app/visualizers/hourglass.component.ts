import { Component, Input, OnChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-hourglass',
  template: `
    <div class="hourglass">
      <div class="top" [style.height.%]="topPct"></div>
      <div class="neck"></div>
      <div class="bottom" [style.height.%]="bottomPct"></div>
    </div>
    <div class="label">Arena — flujo del tiempo</div>
  `,
  styles: [`.hourglass{width:160px;height:240px;border:4px solid #b85;padding:8px;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;background:linear-gradient(180deg,#fff,#ffe)}.top{width:80%;background:linear-gradient(#ffd, #f7b)}.bottom{width:80%;background:linear-gradient(#f7b,#ffecb)}.neck{width:6px;height:30px;background:#c33;border-radius:3px}`]
})
export class HourglassComponent implements OnChanges{
  @Input() time: Date = new Date();
  topPct=50; bottomPct=50;
  ngOnChanges(){
    const s = this.time.getHours()*3600 + this.time.getMinutes()*60 + this.time.getSeconds();
    const pct = (s/86400)*100;
    // top decreases over day
    this.topPct = 100 - pct;
    this.bottomPct = pct;
  }
}
