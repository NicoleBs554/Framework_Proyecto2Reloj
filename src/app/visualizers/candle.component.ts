import { Component, Input, OnChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-candle',
  template: `
    <div class="candle">
      <div class="wax" [style.height.%]="waxPct"></div>
      <div class="flame"></div>
    </div>
    <div class="label">Vela — consumo del tiempo</div>
  `,
  styles: [`.candle{width:80px;height:200px;border:1px solid #ddd;display:flex;align-items:flex-end;justify-content:center;position:relative;background:#fff}.wax{width:60px;background:linear-gradient(#fff59d,#fbc02d)}.flame{position:absolute;top:14px;width:18px;height:30px;background:radial-gradient(circle at 50% 30%,#fff59d,#ff7043);border-radius:50%}`]
})
export class CandleComponent implements OnChanges{
  @Input() time: Date = new Date();
  waxPct = 100;
  ngOnChanges(){
    const s = this.time.getHours()*3600 + this.time.getMinutes()*60 + this.time.getSeconds();
    // candle burns during day: wax decreases with pct
    this.waxPct = 100 - (s/86400)*100;
  }
}
