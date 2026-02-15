import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Team { id_equipo: number; nombre_equipo: string; logo_equipo?: string; id_liga?: number }
interface Favorite { id: number; equipo: { id_equipo: number; nombre_equipo: string; logo_equipo?: string } }

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 30px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
    }

    h1 {
      color: #333;
      font-size: 32px;
      font-weight: 700;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    button {
      padding: 10px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }

    button.logout {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .warning {
      background: #fff3cd;
      color: #856404;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
      text-align: center;
      font-weight: 500;
    }

    .teams-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .team-card {
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 15px;
      padding: 20px;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .team-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      border-color: #667eea;
    }

    .team-card.favorite {
      border-color: #ffd700;
      background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
    }

    .team-logo {
      width: 80px;
      height: 80px;
      object-fit: contain;
      margin-bottom: 15px;
    }

    .team-name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 15px;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .favorite-btn {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      border-radius: 8px;
    }

    .favorite-btn.add {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .favorite-btn.remove {
      background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
      color: #333;
    }

    @media (max-width: 768px) {
      .teams-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
      
      h1 {
        font-size: 24px;
      }

      header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }

      .header-actions {
        flex-direction: column;
      }
    }
  `],
  template: `
    <div class="container">
      <header>
        <h1>⚽ LaLiga Equipos</h1>
        <div class="header-actions">
          <button (click)="load()">🔄 Recargar</button>
          <button class="logout" (click)="logout()" *ngIf="getToken()">🚪 Cerrar Sesión</button>
        </div>
      </header>

      <div class="warning" *ngIf="!getToken()">
        ⚠️ Inicia sesión para guardar tus equipos favoritos
      </div>

      <div class="teams-grid">
        <div 
          *ngFor="let t of teams()" 
          class="team-card"
          [class.favorite]="isFavorite(t.id_equipo)"
        >
          <img 
            [src]="t.logo_equipo || 'https://via.placeholder.com/80'" 
            [alt]="t.nombre_equipo"
            class="team-logo"
          />
          <div class="team-name">{{ t.nombre_equipo }}</div>
          
          <button 
            *ngIf="getToken() && !isFavorite(t.id_equipo)" 
            (click)="addFavorite(t.id_equipo)"
            class="favorite-btn add"
          >
            ⭐ Añadir a Favoritos
          </button>
          
          <button 
            *ngIf="getToken() && isFavorite(t.id_equipo)" 
            (click)="removeFavorite(t.id_equipo)"
            class="favorite-btn remove"
          >
            ★ Quitar de Favoritos
          </button>
        </div>
      </div>
    </div>
  `
})
export class TeamsComponent {
  teams = signal<Team[]>([]);
  favorites = signal<Favorite[]>([]);

  constructor(private router: Router) {
    this.load();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  async load() {
    try {
      const res = await fetch('/api/teams');
      const data = await res.json();
      if (Array.isArray(data)) this.teams.set(data);
      if (this.getToken()) await this.loadFavorites();
    } catch (err) {
      console.error(err);
    }
  }

  async loadFavorites() {
    const token = this.getToken();
    if (!token) return;
    try {
      const res = await fetch('/api/favorites', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) this.favorites.set(data);
    } catch (err) {
      console.error(err);
    }
  }

  isFavorite(id_equipo: number): boolean {
    return this.favorites().some(f => f.equipo.id_equipo === id_equipo);
  }

  async addFavorite(id_equipo: number) {
    const token = this.getToken();
    if (!token) return;
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id_equipo })
      });
      if (res.ok) await this.loadFavorites();
    } catch (err) {
      console.error(err);
    }
  }

  async removeFavorite(id_equipo: number) {
    const fav = this.favorites().find(f => f.equipo.id_equipo === id_equipo);
    if (!fav) return;
    const token = this.getToken();
    if (!token) return;
    try {
      const res = await fetch(`/api/favorites/${fav.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) await this.loadFavorites();
    } catch (err) {
      console.error(err);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
