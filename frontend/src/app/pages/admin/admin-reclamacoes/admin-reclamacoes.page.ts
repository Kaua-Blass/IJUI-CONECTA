import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ReclamacoesService } from '../../../services/reclamacoes.service';
import { Reclamacao } from '../../../models';

@Component({ selector: 'app-admin-reclamacoes', templateUrl: './admin-reclamacoes.page.html', styleUrls: ['./admin-reclamacoes.page.scss'] })
export class AdminReclamacoesPage implements OnInit {
  reclamacoes: Reclamacao[] = [];
  statusSel = '';
  loading = true;
  statuses = [{v:'',l:'Todas'},{v:'aberto',l:'Abertas'},{v:'em_andamento',l:'Em andamento'},{v:'resolvido',l:'Resolvidas'}];

  constructor(private svc: ReclamacoesService, private alertCtrl: AlertController, private toastCtrl: ToastController) {}
  ngOnInit() { this.carregar(); }
  ionViewWillEnter() { this.carregar(); }

  carregar() {
    this.loading = true;
    this.svc.listar(this.statusSel || undefined).subscribe({
      next: r => { this.reclamacoes = r.data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  async atualizarStatus(r: Reclamacao) {
    const alert = await this.alertCtrl.create({
      header: 'Atualizar status',
      subHeader: r.protocolo,
      inputs: [
        { type: 'radio', label: 'Aberto',       value: 'aberto',       checked: r.status==='aberto' },
        { type: 'radio', label: 'Em andamento', value: 'em_andamento', checked: r.status==='em_andamento' },
        { type: 'radio', label: 'Resolvido',    value: 'resolvido',    checked: r.status==='resolvido' },
        { type: 'textarea', placeholder: 'Observação para o cidadão...', name: 'mensagem' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Salvar', handler: async (data) => {
          if (!data) return;
          const status = typeof data === 'string' ? data : data.values?.find((v: any) => v);
          const mensagem = data.mensagem || 'Status atualizado.';
          this.svc.atualizarStatus(r.id, status, mensagem).subscribe(async () => {
            r.status = status;
            const t = await this.toastCtrl.create({ message: 'Status atualizado!', duration: 2000, color: 'success', position: 'top' });
            t.present();
          });
        }}
      ]
    });
    alert.present();
  }

  corStatus(s: string) { return s==='resolvido'?'success':s==='em_andamento'?'warning':'danger'; }
  labelStatus(s: string) { const m:any={aberto:'Aberto',em_andamento:'Em andamento',resolvido:'Resolvido'}; return m[s]||s; }
  pct(s: string) { return s==='resolvido'?100:s==='em_andamento'?50:5; }
  doRefresh(e: any) { this.carregar(); setTimeout(() => e.target.complete(), 800); }
}
