import { Component, Input, OnChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-sun-position',
  template: `
    <svg viewBox="0 0 200 80" class="sky">
      <rect width="200" height="80" fill="url(#g)"/>
      <circle [attr.cx]="x" cy="40" r="10" fill="#FFD54F" />
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#87CEFA"/><stop offset="1" stop-color="#003366"/></linearGradient>
      </defs>
    </svg>
    <div class="label">Sol — posición a lo largo del día</div>
  `,
  styles: [`.sky{width:320px;height:120px}.label{color:#666;margin-top:0.5rem}`]
})
export class SunPositionComponent implements OnChanges{
  @Input() time: Date = new Date();
  x = 100;
  ngOnChanges(){
    const s = this.time.getHours()*3600 + this.time.getMinutes()*60 + this.time.getSeconds();
    // map 0..86400 to 0..200
    this.x = (s/86400)*200;
  }
}
