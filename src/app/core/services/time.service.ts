import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimeService {
  private tick$ = new BehaviorSubject<Date>(new Date());
  readonly time$ = this.tick$.asObservable();

  private running = true;
  private speed = 1; // multiplier of real time
  private simulatedSecondsOfDay: number | null = null; // when non-null, we use this as base seconds-of-day and advance

  private sub: Subscription | null = null;

  constructor() {
    this.start();
  }

  start() {
    if (this.sub) { this.sub.unsubscribe(); }
    let last = performance.now();
    this.sub = interval(50).subscribe(() => {
      const now = performance.now();
      const dt = (now - last) / 1000; last = now;
      if (this.running) {
        if (this.simulatedSecondsOfDay == null) {
          const real = new Date();
          this.tick$.next(real);
        } else {
          this.simulatedSecondsOfDay += dt * this.speed;
          // wrap day
          const s = ((this.simulatedSecondsOfDay % 86400) + 86400) % 86400;
          const base = new Date();
          base.setHours(0,0,0,0);
          const next = new Date(base.getTime() + s * 1000);
          this.tick$.next(next);
        }
      }
    });
  }

  pause() { this.running = false; }
  resume() { this.running = true; }

  setSpeed(mult: number) { this.speed = mult; }

  // set simulated seconds of day (0 - 86400). If null, follow real time.
  setSimulatedSeconds(s: number | null) {
    this.simulatedSecondsOfDay = s == null ? null : Math.max(0, Math.min(86400, s));
  }

  setTime(date: Date) { this.tick$.next(date); }

  destroy() { if (this.sub) { this.sub.unsubscribe(); this.sub = null; } }
}
