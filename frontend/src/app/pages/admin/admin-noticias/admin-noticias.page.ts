import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { NoticiasService } from '../../../services/noticias.service';
import { Noticia } from '../../../models';

@Component({ selector: 'app-admin-noticias', templateUrl: './admin-noticias.page.html', styleUrls: ['./admin-noticias.page.scss'] })
export class AdminNoticiasPage implements OnInit {
  noticias: Noticia[] = [];
  loading = true;
  constructor(private svc: NoticiasService, private alertCtrl: AlertController, private toastCtrl: ToastController) {}
  ngOnInit() { this.carregar(); }
  ionViewWillEnter() { this.carregar(); }
  carregar() { this.svc.listar().subscribe({ next: r => { this.noticias = r.data; this.loading = false; }, error: () => this.loading = false }); }

  async confirmarExcluir(n: Noticia) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir notícia',
      message: `Excluir "${n.titulo}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Excluir', role: 'destructive', handler: () => {
          this.svc.excluir(n.id).subscribe(async () => {
            this.noticias = this.noticias.filter(x => x.id !== n.id);
            const t = await this.toastCtrl.create({ message: 'Notícia excluída.', duration: 2000, color: 'success', position: 'top' });
            t.present();
          });
        }}
      ]
    });
    alert.present();
  }
}
