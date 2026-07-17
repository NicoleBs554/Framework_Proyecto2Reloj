import { Component, Input, OnChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-pendulum',
  template: `
    <div class="pendulum">
      <div class="arm" [style.transform]="'rotate('+angle+'deg)'"></div>
      <div class="bob"></div>
    </div>
    <div class="label">Péndulo — oscilación</div>
  `,
  styles: [`.pendulum{width:220px;height:160px;display:flex;align-items:flex-start;justify-content:center;position:relative}.arm{width:2px;height:80px;background:#333;transform-origin:top center;transition:transform 0.05s linear}.bob{width:28px;height:28px;border-radius:50%;background:#334;border:3px solid #222;margin-top:70px}`]
})
export class PendulumComponent implements OnChanges{
  @Input() time: Date = new Date();
  angle = 0;
  ngOnChanges(){
    // oscillate with period ~4s
    const t = this.time.getTime()/1000;
    this.angle = Math.sin(t * Math.PI * 0.5) * 30;
  }
}
