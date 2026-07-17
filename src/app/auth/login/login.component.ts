import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `:host{display:flex;align-items:center;justify-content:center;height:100vh;background:#f5f7fb}
    .card{background:#fff;padding:2rem;border-radius:8px;box-shadow:0 6px 18px rgba(17,24,39,0.08);width:320px}
    h2{margin:0 0 1rem 0;text-align:center}
    .field{margin-bottom:0.75rem}
    input{width:100%;padding:0.5rem;border:1px solid #e5e7eb;border-radius:4px}
    .error{color:#b91c1c;font-size:0.85rem;margin-top:0.25rem}
    .actions{display:flex;justify-content:space-between;align-items:center;margin-top:1rem}
    a{color:#2563eb;text-decoration:none}
    button{background:#2563eb;color:white;border:none;padding:0.5rem 1rem;border-radius:4px}
    `]
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;
    const ok = this.auth.login(email, password);
    if (ok) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciales inválidas. Verifica email y contraseña.';
    }
  }

  goRegister(): void {
    this.router.navigate(['/register']);
  }
}
