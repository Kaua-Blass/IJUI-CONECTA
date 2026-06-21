import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Evento } from '../models';
import { AuthService } from './auth.service';

const MOCK_EVENTOS: Evento[] = [
  { id: 1, titulo: 'Audiência Pública — Orçamento Participativo 2027', descricao: 'Reunião com a população para definição das prioridades do orçamento municipal de 2027.', local: 'Teatro Municipal Ageu Magalhães', data: '2026-06-20', hora: '19:00' },
  { id: 2, titulo: 'Vacinação contra Influenza — Campanha 2026', descricao: 'Campanha de vacinação contra gripe para toda a população. Procure a UBS mais próxima.', local: 'Todas as UBS do município', data: '2026-06-25', hora: '08:00' },
  { id: 3, titulo: 'Festival de Cultura e Arte de Ijuí', descricao: 'Shows, exposições e apresentações teatrais no Teatro Municipal.', local: 'Teatro Municipal Ageu Magalhães', data: '2026-07-10', hora: '18:00' },
  { id: 4, titulo: 'Mutirão de Limpeza Urbana — Bairro São Geraldo', descricao: 'Ação coletiva de limpeza e revitalização do bairro São Geraldo com parceria da comunidade.', local: 'Praça do Bairro São Geraldo', data: '2026-06-28', hora: '08:00' },
];

@Injectable({ providedIn: 'root' })
export class EventosService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  listar(): Observable<Evento[]> {
    if (this.auth.getToken()?.startsWith('demo-token')) return of(MOCK_EVENTOS);
    return this.http.get<Evento[]>(`${environment.apiUrl}/events`);
  }

  buscar(id: number): Observable<Evento> {
    if (this.auth.getToken()?.startsWith('demo-token')) return of(MOCK_EVENTOS.find(e => e.id === id) || MOCK_EVENTOS[0]);
    return this.http.get<Evento>(`${environment.apiUrl}/events/${id}`);
  }

  criar(dados: Partial<Evento>) { return this.http.post<Evento>(`${environment.apiUrl}/events`, dados); }
  editar(id: number, dados: Partial<Evento>) { return this.http.put<Evento>(`${environment.apiUrl}/events/${id}`, dados); }
  cancelar(id: number) { return this.http.delete(`${environment.apiUrl}/events/${id}`); }
}
