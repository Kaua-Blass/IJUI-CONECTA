import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ideia, Paginated } from '../models';
import { AuthService } from './auth.service';

const MOCK_IDEIAS: Ideia[] = [
  { id: 1, userId: 1, titulo: 'Ciclovia na Av. Lauro Dornelles até a UNIJUÍ', descricao: 'Criação de uma ciclovia conectando o centro à universidade, promovendo mobilidade sustentável e segurança para ciclistas.', categoria: 'Mobilidade urbana', status: 'em_analise', votos: 147, jaVotou: false, createdAt: '2026-05-01T10:00:00Z' },
  { id: 2, userId: 2, titulo: 'Wi-Fi público gratuito na Praça da República', descricao: 'Instalação de pontos de acesso Wi-Fi gratuito na praça central, facilitando o acesso à informação e serviços digitais.', categoria: 'Tecnologia', status: 'aprovada', votos: 112, jaVotou: false, createdAt: '2026-04-20T09:00:00Z' },
  { id: 3, userId: 1, titulo: 'Pontos de coleta seletiva em todos os bairros', descricao: 'Distribuição de contêineres de coleta seletiva em todos os bairros do município para incentivar a reciclagem.', categoria: 'Meio Ambiente', status: 'recebida', votos: 89, jaVotou: false, createdAt: '2026-04-10T08:00:00Z' },
  { id: 4, userId: 2, titulo: 'Praça de convivência no Bairro Getúlio Vargas', descricao: 'Criação de uma praça com área verde, academia ao ar livre e playground para crianças no bairro Getúlio Vargas.', categoria: 'Cultura e lazer', status: 'recebida', votos: 63, jaVotou: false, createdAt: '2026-03-25T07:00:00Z' },
];

@Injectable({ providedIn: 'root' })
export class IdeiasService {
  private mock = MOCK_IDEIAS.map(i => ({ ...i }));

  constructor(private http: HttpClient, private auth: AuthService) {}

  listar(page = 1): Observable<Paginated<Ideia>> {
    if (this.auth.getToken()?.startsWith('demo-token')) return of({ data: this.mock, total: this.mock.length, page, perPage: 20 });
    return this.http.get<Paginated<Ideia>>(`${environment.apiUrl}/ideas`, { params: new HttpParams().set('page', page) });
  }

  criar(dados: { titulo: string; descricao: string; categoria: string }): Observable<Ideia> {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      const nova: Ideia = { id: this.mock.length + 1, userId: 1, ...dados, status: 'recebida', votos: 0, jaVotou: false, createdAt: new Date().toISOString() };
      this.mock.unshift(nova);
      return of(nova);
    }
    return this.http.post<Ideia>(`${environment.apiUrl}/ideas`, dados);
  }

  votar(id: number): Observable<any> {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      const i = this.mock.find(x => x.id === id);
      if (i) { i.votos++; i.jaVotou = true; }
      return of({ ok: true });
    }
    return this.http.post(`${environment.apiUrl}/ideas/${id}/vote`, {});
  }

  atualizarStatus(id: number, status: string) {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      const i = this.mock.find(x => x.id === id);
      if (i) i.status = status as any;
      return of({ ok: true });
    }
    return this.http.put(`${environment.apiUrl}/ideas/${id}/status`, { status });
  }
}
