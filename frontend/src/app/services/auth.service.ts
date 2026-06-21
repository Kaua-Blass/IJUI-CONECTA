import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthResponse, Usuario } from '../models';

// ── Usuários de demonstração (sem backend) ───────────────────
const DEMO_USERS: { email: string; senha: string; usuario: Usuario; token: string }[] = [
  {
    email: 'demo@ijui.gov.br',
    senha: '123456',
    token: 'demo-token-cidadao',
    usuario: { id: 1, nome: 'Cidadão Demo', email: 'demo@ijui.gov.br', role: 'cidadao', ativo: true, createdAt: new Date().toISOString() }
  },
  {
    email: 'admin@ijui.gov.br',
    senha: '123456',
    token: 'demo-token-admin',
    usuario: { id: 2, nome: 'Administrador', email: 'admin@ijui.gov.br', role: 'admin', ativo: true, createdAt: new Date().toISOString() }
  }
];
// ─────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN = 'ijui_token';
  private USER  = 'ijui_user';
  usuario$ = new BehaviorSubject<Usuario | null>(this.getUser());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string): Observable<AuthResponse> {
    const demo = DEMO_USERS.find(u => u.email === email.trim().toLowerCase() && u.senha === senha);
    if (demo) {
      const res: AuthResponse = { token: demo.token, usuario: demo.usuario };
      this.save(res);
      return of(res);
    }
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, senha })
      .pipe(tap(r => this.save(r)));
  }

  cadastro(dados: { nome: string; email: string; cpf?: string; senha: string }) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, dados)
      .pipe(tap(r => this.save(r)));
  }

  recover(email: string) {
    return this.http.post(`${environment.apiUrl}/auth/recover`, { email });
  }

  updatePerfil(dados: Partial<Usuario> & { senhaAtual?: string; novaSenha?: string }) {
    if (this.getToken()?.startsWith('demo-token')) {
      const atual = this.getUser()!;
      const atualizado = { ...atual, ...dados };
      localStorage.setItem(this.USER, JSON.stringify(atualizado));
      this.usuario$.next(atualizado);
      return of(atualizado);
    }
    return this.http.put<Usuario>(`${environment.apiUrl}/users/me`, dados).pipe(
      tap(u => { localStorage.setItem(this.USER, JSON.stringify(u)); this.usuario$.next(u); })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.USER);
    this.usuario$.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return !!this.getToken(); }
  getToken()   { return localStorage.getItem(this.TOKEN); }
  isAdmin()    { return this.getUser()?.role === 'admin'; }

  getUser(): Usuario | null {
    const u = localStorage.getItem(this.USER);
    return u ? JSON.parse(u) : null;
  }

  private save(r: AuthResponse) {
    localStorage.setItem(this.TOKEN, r.token);
    localStorage.setItem(this.USER, JSON.stringify(r.usuario));
    this.usuario$.next(r.usuario);
  }
}
