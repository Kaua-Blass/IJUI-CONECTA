import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models';
import { AuthService } from './auth.service';

const MOCK_USUARIOS: Usuario[] = [
  { id: 1, nome: 'Cidadão Demo', email: 'demo@ijui.gov.br', role: 'cidadao', ativo: true, createdAt: '2026-01-01T00:00:00Z' },
  { id: 2, nome: 'Administrador', email: 'admin@ijui.gov.br', role: 'admin', ativo: true, createdAt: '2026-01-01T00:00:00Z' },
  { id: 3, nome: 'Ana Martins', email: 'ana.martins@email.com', role: 'cidadao', ativo: true, createdAt: '2026-02-10T00:00:00Z' },
  { id: 4, nome: 'Roberto Silva', email: 'roberto.silva@email.com', role: 'cidadao', ativo: false, createdAt: '2026-03-05T00:00:00Z' },
];

@Injectable({ providedIn: 'root' })
export class AdminService {
  private mock = MOCK_USUARIOS.map(u => ({ ...u }));

  constructor(private http: HttpClient, private auth: AuthService) {}

  listarUsuarios(): Observable<Usuario[]> {
    if (this.auth.getToken()?.startsWith('demo-token')) return of(this.mock);
    return this.http.get<Usuario[]>(`${environment.apiUrl}/users`);
  }

  ativarUsuario(id: number): Observable<any> {
    if (this.auth.getToken()?.startsWith('demo-token')) { const u = this.mock.find(x => x.id === id); if (u) u.ativo = true; return of({ ok: true }); }
    return this.http.put(`${environment.apiUrl}/users/${id}/ativar`, {});
  }

  desativarUsuario(id: number): Observable<any> {
    if (this.auth.getToken()?.startsWith('demo-token')) { const u = this.mock.find(x => x.id === id); if (u) u.ativo = false; return of({ ok: true }); }
    return this.http.put(`${environment.apiUrl}/users/${id}/desativar`, {});
  }
}
