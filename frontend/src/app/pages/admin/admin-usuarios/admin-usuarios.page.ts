import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AdminService } from '../../../services/admin.service';
import { Usuario } from '../../../models';

@Component({ selector: 'app-admin-usuarios', templateUrl: './admin-usuarios.page.html', styleUrls: ['./admin-usuarios.page.scss'] })
export class AdminUsuariosPage implements OnInit {
  usuarios: Usuario[] = [];
  loading = true;

  constructor(private svc: AdminService, private alertCtrl: AlertController, private toastCtrl: ToastController) {}
  ngOnInit() { this.carregar(); }
  carregar() { this.svc.listarUsuarios().subscribe({ next: u => { this.usuarios = u; this.loading = false; }, error: () => this.loading = false }); }

  async toggleAtivo(u: Usuario) {
    const acao = u.ativo ? 'desativar' : 'ativar';
    const alert = await this.alertCtrl.create({
      header: `${acao.charAt(0).toUpperCase() + acao.slice(1)} usuário`,
      message: `Deseja ${acao} a conta de ${u.nome}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: acao.charAt(0).toUpperCase() + acao.slice(1), handler: () => {
          const req = u.ativo ? this.svc.desativarUsuario(u.id) : this.svc.ativarUsuario(u.id);
          req.subscribe(async () => {
            u.ativo = !u.ativo;
            const t = await this.toastCtrl.create({ message: `Usuário ${acao === 'ativar' ? 'ativado' : 'desativado'}.`, duration: 2000, color: 'success', position: 'top' });
            t.present();
          });
        }}
      ]
    });
    alert.present();
  }

  iniciais(nome: string) { return nome.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase(); }
  doRefresh(e: any) { this.carregar(); setTimeout(() => e.target.complete(), 800); }
}
