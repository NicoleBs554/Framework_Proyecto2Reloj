import { Component, Input, OnChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-spiral',
  template: `
    <svg viewBox="0 0 200 200" class="spiral">
      <path [attr.d]="d" stroke="#8e24aa" fill="none" stroke-width="2"/>
    </svg>
    <div class="label">Espiral — acumulación del tiempo</div>
  `,
  styles: [`.spiral{width:240px;height:240px}.label{color:#666;margin-top:0.5rem}`]
})
export class SpiralComponent implements OnChanges{
  @Input() time: Date = new Date();
  d = '';
  ngOnChanges(){
    const s = this.time.getHours()*3600 + this.time.getMinutes()*60 + this.time.getSeconds();
    const turns = 1 + (s/86400)*6;
    const rmax = 80;
    let path = '';
    const steps = 200;
    for(let i=0;i<=steps;i++){
      const t = i/steps * Math.PI * 2 * turns;
      const r = (i/steps)*rmax;
      const x = 100 + Math.cos(t)*r;
      const y = 100 + Math.sin(t)*r;
      path += (i===0? 'M':'L') + x + ',' + y + ' ';
    }
    this.d = path;
  }
}
