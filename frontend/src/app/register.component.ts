import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    .container {
      max-width: 400px;
      width: 100%;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 40px;
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    h2 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
      font-size: 28px;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      color: #555;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 15px;
      transition: all 0.3s ease;
      outline: none;
    }

    input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      margin-top: 10px;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    button:active {
      transform: translateY(0);
    }

    .error {
      background: #fee;
      color: #c33;
      padding: 12px;
      border-radius: 8px;
      margin-top: 15px;
      text-align: center;
      font-size: 14px;
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
      color: #666;
      font-size: 14px;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `],
  template: `
    <div class="container">
      <h2>⚽ Crear Cuenta</h2>
      <form (submit)="onSubmit($event)">
        <div class="form-group">
          <label for="username">Usuario</label>
          <input id="username" name="username" type="text" placeholder="Elige un nombre de usuario" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input id="password" name="password" type="password" placeholder="Crea una contraseña segura" required />
        </div>
        <button type="submit">Crear Cuenta</button>
      </form>
      <div class="error" *ngIf="error()">{{ error() }}</div>
      <div class="login-link">
        ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
      </div>
    </div>
  `
})
export class RegisterComponent {
  error = signal('');
  constructor(private router: Router) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const username = String(fd.get('username') || '');
    const password = String(fd.get('password') || '');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/teams']);
      } else {
        this.error.set(data.error || 'Registro fallido');
      }
    } catch (err) {
      this.error.set('Network error');
    }
  }
}
