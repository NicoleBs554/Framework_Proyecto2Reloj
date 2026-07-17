import { Component, Input, OnChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-day-progress',
  template: `
    <div class="bar">
      <div class="fill" [style.width.%]="pct"></div>
    </div>
    <div class="label">Barra del día — progreso: {{pct | number:'1.0-2'}}%</div>
  `,
  styles: [`.bar{width:80%;height:28px;background:#eee;border-radius:14px;overflow:hidden}.fill{height:100%;background:linear-gradient(90deg,#ff8a65,#ff5252)}.label{margin-top:0.5rem;color:#666}`]
})
export class DayProgressComponent implements OnChanges{
  @Input() time: Date = new Date();
  pct=0;
  ngOnChanges(){
    const s = this.time.getHours()*3600 + this.time.getMinutes()*60 + this.time.getSeconds();
    this.pct = (s/86400)*100;
  }
}
