import { Component, Input, OnChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-waveform',
  template: `
    <svg viewBox="0 0 400 120" class="wave">
      <path [attr.d]="path" stroke="#42a5f5" stroke-width="3" fill="none" />
    </svg>
    <div class="label">Wave — ciclo y frecuencia</div>
  `,
  styles: [`.wave{width:420px;height:140px}.label{color:#666;margin-top:0.5rem}`]
})
export class WaveformComponent implements OnChanges{
  @Input() time: Date = new Date();
  path = '';
  ngOnChanges(){
    const t = this.time.getTime()/1000;
    const pts = 80;
    const w = 400; const h = 60;
    const freq = 0.1 + (this.time.getSeconds()/60)*0.5;
    let d = '';
    for(let i=0;i<pts;i++){
      const x = (i/(pts-1))*w;
      const y = h + Math.sin((i/pts)*Math.PI*4 + t*freq)*20;
      d += (i===0? 'M':'L')+x+','+y+' ';
    }
    this.path = d;
  }
}
