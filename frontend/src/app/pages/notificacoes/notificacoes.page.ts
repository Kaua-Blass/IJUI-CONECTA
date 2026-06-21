import { Component, OnInit } from '@angular/core';
import { NotificacoesService } from '../../services/notificacoes.service';
import { Notificacao } from '../../models';

@Component({ selector: 'app-notificacoes', templateUrl: './notificacoes.page.html', styleUrls: ['./notificacoes.page.scss'] })
export class NotificacoesPage implements OnInit {
  notificacoes: Notificacao[] = [];
  loading = true;

  constructor(private svc: NotificacoesService) {}
  ngOnInit() { this.carregar(); }

  carregar() {
    this.svc.listar().subscribe({ next: n => { this.notificacoes = n; this.loading = false; }, error: () => this.loading = false });
  }

  marcarLida(n: Notificacao) {
    if (n.lida) return;
    this.svc.marcarLida(n.id).subscribe(() => n.lida = true);
  }

  doRefresh(e: any) { this.carregar(); setTimeout(() => e.target.complete(), 800); }
}
