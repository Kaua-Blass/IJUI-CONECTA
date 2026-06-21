import { Component, OnInit } from '@angular/core';
import { IdeiasService } from '../../services/ideias.service';
import { Ideia } from '../../models';

@Component({ selector: 'app-ideias', templateUrl: './ideias.page.html', styleUrls: ['./ideias.page.scss'] })
export class IdeiasPage implements OnInit {
  ideias: Ideia[] = [];
  loading = true;

  constructor(private svc: IdeiasService) {}
  ngOnInit() { this.carregar(); }
  ionViewWillEnter() { this.carregar(); }

  carregar() {
    this.loading = true;
    this.svc.listar().subscribe({ next: r => { this.ideias = r.data; this.loading = false; }, error: () => this.loading = false });
  }

  votar(ideia: Ideia) {
    if (ideia.jaVotou) return;
    this.svc.votar(ideia.id).subscribe(() => { ideia.votos++; ideia.jaVotou = true; });
  }

  corStatus(s: string) {
    const m: any = { recebida: 'medium', em_analise: 'primary', aprovada: 'success', implementada: 'tertiary' };
    return m[s] || 'medium';
  }

  labelStatus(s: string) {
    const m: any = { recebida: 'Recebida', em_analise: 'Em análise', aprovada: 'Aprovada', implementada: 'Implementada' };
    return m[s] || s;
  }

  doRefresh(e: any) { this.carregar(); setTimeout(() => e.target.complete(), 800); }
}
