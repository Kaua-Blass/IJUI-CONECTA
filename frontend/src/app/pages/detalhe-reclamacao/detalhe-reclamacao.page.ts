import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamacoesService } from '../../services/reclamacoes.service';
import { Reclamacao } from '../../models';

@Component({ selector: 'app-detalhe-reclamacao', templateUrl: './detalhe-reclamacao.page.html', styleUrls: ['./detalhe-reclamacao.page.scss'] })
export class DetalheReclamacaoPage implements OnInit {
  reclamacao: Reclamacao | null = null;
  constructor(private route: ActivatedRoute, private svc: ReclamacoesService) {}
  ngOnInit() { this.svc.buscar(Number(this.route.snapshot.paramMap.get('id'))).subscribe(r => this.reclamacao = r); }
  corStatus(s: string) { return s==='resolvido'?'success':s==='em_andamento'?'warning':'danger'; }
  labelStatus(s: string) { const m:any={aberto:'Aberto',em_andamento:'Em andamento',resolvido:'Resolvido'}; return m[s]||s; }
}
