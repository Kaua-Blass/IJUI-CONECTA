import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transparencia } from '../models';
import { AuthService } from './auth.service';

const MOCK_TRANSPARENCIA: Transparencia = {
  totalUsuarios: 3482,
  totalReclamacoes: 284,
  reclamacoesResolvidas: 216,
  ideiasTotal: 156,
  ideiasImplementadas: 12,
  mediaAvaliacoes: 4.1
};

@Injectable({ providedIn: 'root' })
export class TransparenciaService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  indicadores(): Observable<Transparencia> {
    if (this.auth.getToken()?.startsWith('demo-token')) return of(MOCK_TRANSPARENCIA);
    return this.http.get<Transparencia>(`${environment.apiUrl}/dashboard`);
  }
}
