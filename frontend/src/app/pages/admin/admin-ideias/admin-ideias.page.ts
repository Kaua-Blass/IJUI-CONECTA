import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { IdeiasService } from '../../../services/ideias.service';
import { Ideia } from '../../../models';

@Component({ selector: 'app-admin-ideias', templateUrl: './admin-ideias.page.html', styleUrls: ['./admin-ideias.page.scss'] })
export class AdminIdeiasPage implements OnInit {
  ideias: Ideia[] = [];
  loading = true;
  statuses = [
    { v: 'recebida',      l: 'Recebida',      color: 'medium' },
    { v: 'em_analise',    l: 'Em análise',    color: 'primary' },
    { v: 'aprovada',      l: 'Aprovada',      color: 'success' },
    { v: 'implementada',  l: 'Implementada',  color: 'tertiary' }
  ];

  constructor(private svc: IdeiasService, private alertCtrl: AlertController, private toastCtrl: ToastController) {}
  ngOnInit() { this.carregar(); }
  ionViewWillEnter() { this.carregar(); }
  carregar() { this.svc.listar().subscribe({ next: r => { this.ideias = r.data; this.loading = false; }, error: () => this.loading = false }); }

  async atualizarStatus(ideia: Ideia) {
    const alert = await this.alertCtrl.create({
      header: 'Alterar situação',
      subHeader: ideia.titulo,
      inputs: this.statuses.map(s => ({
        type: 'radio' as const, label: s.l, value: s.v, checked: ideia.status === s.v
      })),
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Salvar', handler: async (status) => {
          if (!status) return;
          this.svc.atualizarStatus(ideia.id, status).subscribe(async () => {
            ideia.status = status as any;
            const t = await this.toastCtrl.create({ message: 'Situação atualizada!', duration: 2000, color: 'success', position: 'top' });
            t.present();
          });
        }}
      ]
    });
    alert.present();
  }

  corStatus(s: string) { return this.statuses.find(x => x.v===s)?.color || 'medium'; }
  labelStatus(s: string) { return this.statuses.find(x => x.v===s)?.l || s; }
  doRefresh(e: any) { this.carregar(); setTimeout(() => e.target.complete(), 800); }
}
