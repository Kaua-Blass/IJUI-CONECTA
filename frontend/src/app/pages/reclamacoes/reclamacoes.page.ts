import { Component, OnInit } from '@angular/core';
import { ReclamacoesService } from '../../services/reclamacoes.service';
import { Reclamacao } from '../../models';

@Component({ selector: 'app-reclamacoes', templateUrl: './reclamacoes.page.html', styleUrls: ['./reclamacoes.page.scss'] })
export class ReclamacoesPage implements OnInit {
  reclamacoes: Reclamacao[] = [];
  statusSel = '';
  loading = true;
  statuses = [{v:'',l:'Todas'},{v:'aberto',l:'Abertas'},{v:'em_andamento',l:'Em andamento'},{v:'resolvido',l:'Resolvidas'}];

  constructor(private svc: ReclamacoesService) {}
  ngOnInit() { this.carregar(); }
  ionViewWillEnter() { this.carregar(); }

  carregar() {
    this.loading = true;
    this.svc.listar(this.statusSel || undefined).subscribe({
      next: r => { this.reclamacoes = r.data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  corStatus(s: string) { return s==='resolvido'?'success':s==='em_andamento'?'warning':'danger'; }
  labelStatus(s: string) { const m:any={aberto:'Aberto',em_andamento:'Em andamento',resolvido:'Resolvido'}; return m[s]||s; }
  pct(s: string) { return s==='resolvido'?100:s==='em_andamento'?50:5; }
  doRefresh(e: any) { this.carregar(); setTimeout(() => e.target.complete(), 800); }
}
