import { Component, Input, OnChanges } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-binary-clock',
  template: `
    <div class="grid">
      <div *ngFor="let b of bits" [class.on]="b"></div>
    </div>
    <div class="label">Binary — bits cambiantes</div>
  `,
  styles: [`.grid{display:grid;grid-template-columns:repeat(6,20px);gap:6px}.grid div{width:20px;height:20px;background:#eee;border-radius:4px}.grid div.on{background:#4caf50}.label{color:#666;margin-top:0.5rem}`]
})
export class BinaryClockComponent implements OnChanges{
  @Input() time: Date = new Date();
  bits: boolean[] = Array(24).fill(false);
  ngOnChanges(){
    const h = this.time.getHours(); const m = this.time.getMinutes(); const s = this.time.getSeconds();
    const all = [...this.toBits(h,5), ...this.toBits(m,6), ...this.toBits(s,6)];
    this.bits = all.map(x=>!!x);
  }
  toBits(n:number, len:number){ const arr = []; for(let i=len-1;i>=0;i--){ arr.push((n>>i)&1); } return arr; }
}
