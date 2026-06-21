import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificacoesService } from '../../services/notificacoes.service';
import { Usuario } from '../../models';

@Component({ selector: 'app-home', templateUrl: './home.page.html', styleUrls: ['./home.page.scss'] })
export class HomePage implements OnInit {
  usuario: Usuario | null = null;
  naoLidas = 0;
  hoje = new Date().toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  constructor(private auth: AuthService, private notifSvc: NotificacoesService) {}

  ngOnInit() { this.usuario = this.auth.getUser(); this.contarNotificacoes(); }
  ionViewWillEnter() { this.usuario = this.auth.getUser(); this.contarNotificacoes(); }

  contarNotificacoes() {
    this.notifSvc.listar().subscribe(ns => this.naoLidas = ns.filter(n => !n.lida).length);
  }

  primeiroNome(): string {
    return this.usuario?.nome?.split(' ')[0] ?? 'Cidadão';
  }
}
