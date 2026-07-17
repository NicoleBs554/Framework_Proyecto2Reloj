import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-analog-clock',
  template: `
    <svg viewBox="0 0 200 200" class="clock">
      <circle cx="100" cy="100" r="95" fill="#f8f8f8" stroke="#ddd"/>
      <g [attr.transform]="'rotate('+hourAngle+' 100 100)'"><rect x="98" y="50" width="4" height="60" rx="2" fill="#222"/></g>
      <g [attr.transform]="'rotate('+minAngle+' 100 100)'"><rect x="99" y="35" width="2" height="80" rx="1" fill="#555"/></g>
      <g [attr.transform]="'rotate('+secAngle+' 100 100)'"><rect x="100" y="20" width="1" height="90" fill="#e53935"/></g>
      <circle cx="100" cy="100" r="3" fill="#222"/>
    </svg>
    <div class="label">Analog — movimiento circular</div>
  `,
  styles: [`.clock{width:220px;height:220px}.label{margin-top:0.5rem;color:#666}`]
})
export class AnalogClockComponent implements OnChanges{
  @Input() time: Date = new Date();
  hourAngle=0; minAngle=0; secAngle=0;
  ngOnChanges(ch: SimpleChanges){ this.update(); }
  update(){
    const t = this.time;
    this.secAngle = t.getSeconds() * 6;
    this.minAngle = t.getMinutes() * 6 + t.getSeconds() * 0.1;
    this.hourAngle = (t.getHours() % 12) * 30 + t.getMinutes() * 0.5;
  }
}
