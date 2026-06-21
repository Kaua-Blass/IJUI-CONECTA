import { Component, OnInit } from '@angular/core';
import { TransparenciaService } from '../../services/transparencia.service';
import { Transparencia } from '../../models';

@Component({ selector: 'app-transparencia', templateUrl: './transparencia.page.html', styleUrls: ['./transparencia.page.scss'] })
export class TransparenciaPage implements OnInit {
  dados: Transparencia | null = null;
  loading = true;

  constructor(private svc: TransparenciaService) {}
  ngOnInit() { this.svc.indicadores().subscribe({ next: d => { this.dados = d; this.loading = false; }, error: () => this.loading = false }); }

  pctResolvidas() {
    if (!this.dados || !this.dados.totalReclamacoes) return 0;
    return Math.round((this.dados.reclamacoesResolvidas / this.dados.totalReclamacoes) * 100);
  }

  pctImplementadas() {
    if (!this.dados || !this.dados.ideiasTotal) return 0;
    return Math.round((this.dados.ideiasImplementadas / this.dados.ideiasTotal) * 100);
  }
}
