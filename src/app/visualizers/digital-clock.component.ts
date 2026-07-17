import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-digital-clock',
  template: `<div class="digital">{{pad(h)}}:{{pad(m)}}:{{pad(s)}}</div><div class="label">Digital — el paso del tiempo</div>`,
  styles: [`.digital{font-size:3rem;font-weight:700;font-family:monospace}.label{color:#666;margin-top:0.5rem}`]
})
export class DigitalClockComponent{
  @Input() time: Date = new Date();
  get h(){ return this.time.getHours(); }
  get m(){ return this.time.getMinutes(); }
  get s(){ return this.time.getSeconds(); }
  pad(n:number){ return String(n).padStart(2,'0'); }
}
