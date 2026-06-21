import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Feedback } from '../models';
import { AuthService } from './auth.service';

const MOCK_FEEDBACKS: Feedback[] = [
  { id: 1, userId: 1, projeto: 'Parques e áreas verdes', nota: 5, comentario: 'Ótima iniciativa! O parque ficou muito mais bonito.', createdAt: '2026-06-01T10:00:00Z' },
  { id: 2, userId: 2, projeto: 'Pavimentação de vias', nota: 3, comentario: 'A obra está avançando, mas o desvio causou transtornos.', createdAt: '2026-05-29T09:00:00Z' },
  { id: 3, userId: 1, projeto: 'UBS e postos de saúde', nota: 4, comentario: 'Atendimento melhorou bastante após a reforma.', createdAt: '2026-05-20T08:00:00Z' },
];

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private mock = [...MOCK_FEEDBACKS];

  constructor(private http: HttpClient, private auth: AuthService) {}

  listar(): Observable<Feedback[]> {
    if (this.auth.getToken()?.startsWith('demo-token')) return of(this.mock);
    return this.http.get<Feedback[]>(`${environment.apiUrl}/feedback`);
  }

  criar(dados: { projeto: string; nota: number; comentario?: string }): Observable<Feedback> {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      const novo: Feedback = { id: this.mock.length + 1, userId: 1, ...dados, createdAt: new Date().toISOString() };
      this.mock.unshift(novo);
      return of(novo);
    }
    return this.http.post<Feedback>(`${environment.apiUrl}/feedback`, dados);
  }
}
