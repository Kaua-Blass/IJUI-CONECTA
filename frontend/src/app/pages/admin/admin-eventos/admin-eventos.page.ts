import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { EventosService } from '../../../services/eventos.service';
import { Evento } from '../../../models';

@Component({ selector: 'app-admin-eventos', templateUrl: './admin-eventos.page.html', styleUrls: ['./admin-eventos.page.scss'] })
export class AdminEventosPage implements OnInit {
  eventos: Evento[] = [];
  loading = true;
  constructor(private svc: EventosService, private alertCtrl: AlertController, private toastCtrl: ToastController) {}
  ngOnInit() { this.carregar(); }
  ionViewWillEnter() { this.carregar(); }
  carregar() { this.svc.listar().subscribe({ next: e => { this.eventos = e; this.loading = false; }, error: () => this.loading = false }); }

  async confirmarCancelar(e: Evento) {
    const alert = await this.alertCtrl.create({
      header: 'Cancelar evento',
      message: `Cancelar "${e.titulo}"?`,
      buttons: [
        { text: 'Não', role: 'cancel' },
        { text: 'Cancelar evento', role: 'destructive', handler: () => {
          this.svc.cancelar(e.id).subscribe(async () => {
            e.cancelado = true;
            const t = await this.toastCtrl.create({ message: 'Evento cancelado.', duration: 2000, color: 'warning', position: 'top' });
            t.present();
          });
        }}
      ]
    });
    alert.present();
  }
}
