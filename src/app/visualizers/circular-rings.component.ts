import { Component, Input, OnChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-circular-rings',
  template: `
    <svg viewBox="0 0 200 200" class="rings">
      <circle cx="100" cy="100" r="30" [attr.stroke-dasharray]="circ(s)" stroke="#ff8a65" stroke-width="8" fill="none"/>
      <circle cx="100" cy="100" r="50" [attr.stroke-dasharray]="circ(m)" stroke="#ffd54f" stroke-width="6" fill="none"/>
      <circle cx="100" cy="100" r="70" [attr.stroke-dasharray]="circ(h)" stroke="#81d4fa" stroke-width="4" fill="none"/>
    </svg>
    <div class="label">Aros — cada anillo representa H/M/S</div>
  `,
  styles: [`.rings{width:220px;height:220px}.label{color:#666;margin-top:0.5rem}`]
})
export class CircularRingsComponent implements OnChanges{
  @Input() time: Date = new Date();
  s=0; m=0; h=0;
  ngOnChanges(){
    this.s = (this.time.getSeconds()/60)*100;
    this.m = (this.time.getMinutes()/60)*100;
    this.h = ((this.time.getHours()%12)/12)*100;
  }
  circ(v:number){ return v + ',100'; }
}
