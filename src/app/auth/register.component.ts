import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

type User = { username: string; password: string };

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="box">
      <h2>Registro</h2>
      <label>Usuario <input [(ngModel)]="username"/></label>
      <label>Contraseña <input type="password" [(ngModel)]="password"/></label>
      <div class="actions">
        <button (click)="register()">Crear cuenta</button>
        <button (click)="goLogin()">Ir a Login</button>
      </div>
      <p *ngIf="message">{{message}}</p>
    </div>
  `,
  styles: [`.box{max-width:380px;margin:3rem auto;padding:1rem;border:1px solid #ddd;border-radius:8px}label{display:block;margin:0.5rem 0}`]
})
export class RegisterComponent {
  username = '';
  password = '';
  message = '';
  constructor(private router: Router) {}
  goLogin(){ this.router.navigate(['/login']); }
  register(){
    if(!this.username || !this.password){ this.message = 'Completa los campos'; return; }
    const users: User[] = JSON.parse(localStorage.getItem('tv_users')||'[]');
    if(users.find(u=>u.username===this.username)){ this.message = 'Usuario ya existe'; return; }
    users.push({ username: this.username, password: this.password });
    localStorage.setItem('tv_users', JSON.stringify(users));
    this.message = 'Cuenta creada. Redirigiendo...';
    setTimeout(()=> this.router.navigate(['/login']),800);
  }
}
