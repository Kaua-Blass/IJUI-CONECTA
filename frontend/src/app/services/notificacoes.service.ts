import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Notificacao } from '../models';
import { AuthService } from './auth.service';

const MOCK_NOTIFICACOES: Notificacao[] = [
  { id: 1, titulo: 'Reclamação atualizada', mensagem: 'Seu protocolo #2831 foi encaminhado para a Secretaria de Obras.', lida: false, createdAt: '2026-06-04T10:00:00Z' },
  { id: 2, titulo: 'Nova notícia publicada', mensagem: 'Plantio de 500 árvores no Parque Municipal inicia esta semana.', lida: false, createdAt: '2026-06-01T09:00:00Z' },
  { id: 3, titulo: 'Evento criado', mensagem: 'Audiência Pública sobre Orçamento 2027 será dia 20/06 às 19h.', lida: true, createdAt: '2026-05-30T08:00:00Z' },
];

@Injectable({ providedIn: 'root' })
export class NotificacoesService {
  private mock = MOCK_NOTIFICACOES.map(n => ({ ...n }));

  constructor(private http: HttpClient, private platform: Platform, private auth: AuthService) {}

  listar(): Observable<Notificacao[]> {
    if (this.auth.getToken()?.startsWith('demo-token')) return of(this.mock);
    return this.http.get<Notificacao[]>(`${environment.apiUrl}/notifications`);
  }

  marcarLida(id: number): Observable<any> {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      const n = this.mock.find(x => x.id === id);
      if (n) n.lida = true;
      return of({ ok: true });
    }
    return this.http.put(`${environment.apiUrl}/notifications/${id}/read`, {});
  }

  async initPush() {
    if (!this.platform.is('capacitor')) return;
    try {
      const { PushNotifications } = await import('@capacitor/push-notifications');
      const perm = await PushNotifications.requestPermissions();
      if (perm.receive !== 'granted') return;
      await PushNotifications.register();
      PushNotifications.addListener('registration', token => {
        this.http.post(`${environment.apiUrl}/push/token`, { token: token.value }).subscribe();
      });
    } catch (e) {
      console.warn('Push notifications não disponível:', e);
    }
  }
}
