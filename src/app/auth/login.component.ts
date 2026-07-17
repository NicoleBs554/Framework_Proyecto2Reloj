import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="box">
      <h2>Iniciar sesión</h2>
      <label>Usuario <input [(ngModel)]="username"/></label>
      <label>Contraseña <input type="password" [(ngModel)]="password"/></label>
      <div class="actions">
        <button (click)="login()">Entrar</button>
        <button (click)="goRegister()">Crear cuenta</button>
      </div>
      <p *ngIf="message">{{message}}</p>
    </div>
  `,
  styles: [`.box{max-width:380px;margin:3rem auto;padding:1rem;border:1px solid #ddd;border-radius:8px}label{display:block;margin:0.5rem 0}`]
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';
  constructor(private router: Router) {}
  goRegister(){ this.router.navigate(['/register']); }
  login(){
    const users = JSON.parse(localStorage.getItem('tv_users')||'[]');
    const u = users.find((x:any)=> x.username===this.username && x.password===this.password);
    if(!u){ this.message = 'Credenciales inválidas'; return; }
    localStorage.setItem('tv_session', JSON.stringify({ username: this.username, token: Math.random().toString(36).slice(2) }));
    this.message = 'Ingresando...';
    setTimeout(()=> this.router.navigate(['/visualizer']),400);
  }
}
