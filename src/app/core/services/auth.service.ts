import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly usersKey = 'users';
  private readonly currentUserKey = 'currentUser';

  private authState = new BehaviorSubject<boolean>(this.hasStoredLogin());
  authState$ = this.authState.asObservable();

  constructor() {}

  register(user: User): boolean {
    const users = this.getUsers();
    if (users.find(u => u.email === user.email)) {
      return false; // usuario ya existe
    }
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return false;
    }
    const current = { isLoggedIn: true, email };
    localStorage.setItem(this.currentUserKey, JSON.stringify(current));
    this.authState.next(true);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.authState.next(false);
  }

  isAuthenticated(): boolean {
    return this.authState.value === true;
  }

  getAuthState(): Observable<boolean> {
    return this.authState$;
  }

  getCurrentUserEmail(): string | null {
    const raw = localStorage.getItem(this.currentUserKey);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed?.email ?? null;
    } catch {
      return null;
    }
  }

  // Helpers
  private getUsers(): User[] {
    const raw = localStorage.getItem(this.usersKey);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as User[];
    } catch {
      return [];
    }
  }

  private hasStoredLogin(): boolean {
    const raw = localStorage.getItem(this.currentUserKey);
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw);
      return parsed?.isLoggedIn === true;
    } catch {
      return false;
    }
  }
}
