import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reclamacao, Paginated } from '../models';
import { AuthService } from './auth.service';

const MOCK_RECLAMACOES: Reclamacao[] = [
  { id: 1, protocolo: '#2831', userId: 1, categoria: 'buraco', descricao: 'Buraco de aproximadamente 40cm na Rua Marechal Floriano, próximo ao n° 480, causando risco a veículos.', status: 'em_andamento', createdAt: '2026-05-28T09:00:00Z', atualizacoes: [
    { id: 1, mensagem: 'Reclamação recebida e registrada no sistema.', status: 'aberto', createdAt: '2026-05-28T09:00:00Z' },
    { id: 2, mensagem: 'Encaminhada para a Secretaria de Obras para análise.', status: 'em_andamento', createdAt: '2026-05-29T14:00:00Z' },
  ]},
  { id: 2, protocolo: '#2798', userId: 1, categoria: 'iluminacao', descricao: 'Lâmpada queimada no Bairro São Geraldo — Rua das Acácias, deixando trecho sem iluminação há 5 dias.', status: 'resolvido', createdAt: '2026-05-20T08:00:00Z', atualizacoes: [
    { id: 3, mensagem: 'Reclamação recebida.', status: 'aberto', createdAt: '2026-05-20T08:00:00Z' },
    { id: 4, mensagem: 'Equipe de manutenção acionada.', status: 'em_andamento', createdAt: '2026-05-21T10:00:00Z' },
    { id: 5, mensagem: 'Lâmpada substituída. Problema resolvido.', status: 'resolvido', createdAt: '2026-05-22T15:00:00Z' },
  ]},
  { id: 3, protocolo: '#2840', userId: 1, categoria: 'lixo', descricao: 'Ponto de descarte irregular de entulho na Av. Rio Branco, acumulando há mais de uma semana.', status: 'aberto', createdAt: '2026-06-02T10:00:00Z', atualizacoes: [
    { id: 6, mensagem: 'Reclamação recebida e registrada.', status: 'aberto', createdAt: '2026-06-02T10:00:00Z' },
  ]},
];

@Injectable({ providedIn: 'root' })
export class ReclamacoesService {
  private mock = [...MOCK_RECLAMACOES];

  constructor(private http: HttpClient, private auth: AuthService) {}

  listar(status?: string, page = 1): Observable<Paginated<Reclamacao>> {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      let data = status ? this.mock.filter(r => r.status === status) : this.mock;
      return of({ data, total: data.length, page, perPage: 20 });
    }
    let p = new HttpParams().set('page', page);
    if (status) p = p.set('status', status);
    return this.http.get<Paginated<Reclamacao>>(`${environment.apiUrl}/complaints`, { params: p });
  }

  minhas(): Observable<Reclamacao[]> {
    if (this.auth.getToken()?.startsWith('demo-token')) return of(this.mock);
    return this.http.get<Reclamacao[]>(`${environment.apiUrl}/complaints?mine=true`);
  }

  buscar(id: number): Observable<Reclamacao> {
    if (this.auth.getToken()?.startsWith('demo-token')) return of(this.mock.find(r => r.id === id) || this.mock[0]);
    return this.http.get<Reclamacao>(`${environment.apiUrl}/complaints/${id}`);
  }

  criar(dados: FormData): Observable<Reclamacao> {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      const nova: Reclamacao = {
        id: this.mock.length + 1,
        protocolo: '#' + (2860 + this.mock.length),
        userId: 1,
        categoria: dados.get('categoria') as string,
        descricao: dados.get('descricao') as string,
        status: 'aberto',
        createdAt: new Date().toISOString(),
        atualizacoes: [{ id: 99, mensagem: 'Reclamação recebida e registrada.', status: 'aberto', createdAt: new Date().toISOString() }]
      };
      this.mock.unshift(nova);
      return of(nova);
    }
    return this.http.post<Reclamacao>(`${environment.apiUrl}/complaints`, dados);
  }

  atualizarStatus(id: number, status: string, mensagem: string) {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      const r = this.mock.find(x => x.id === id);
      if (r) { r.status = status as any; r.atualizacoes?.push({ id: Date.now(), mensagem, status, createdAt: new Date().toISOString() }); }
      return of({ ok: true });
    }
    return this.http.put(`${environment.apiUrl}/complaints/${id}/status`, { status, mensagem });
  }
}
