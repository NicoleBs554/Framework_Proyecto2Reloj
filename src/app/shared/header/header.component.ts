import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  template: `
    <header class="hdr">
      <div class="left"><a routerLink="/visualizer">Visualizar tiempo</a></div>
      <div class="right">
        <span *ngIf="user">{{user.username}}</span>
        <a *ngIf="!user" routerLink="/login">Login</a>
        <button *ngIf="user" (click)="logout()">Cerrar sesión</button>
      </div>
    </header>
  `,
  styles: [`.hdr{display:flex;justify-content:space-between;padding:0.5rem 1rem;border-bottom:1px solid #eee}.left a{font-weight:600}.right{display:flex;gap:0.5rem;align-items:center}`],
  imports: [RouterModule, CommonModule]
})
export class HeaderComponent {
  user = JSON.parse(localStorage.getItem('tv_session')||'null');
  constructor(private router: Router) {}
  logout(){ localStorage.removeItem('tv_session'); this.user = null; this.router.navigate(['/login']); }
}
