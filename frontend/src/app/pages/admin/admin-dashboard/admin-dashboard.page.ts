import { Component, OnInit } from '@angular/core';
import { TransparenciaService } from '../../../services/transparencia.service';
import { Transparencia } from '../../../models';

@Component({ selector: 'app-admin-dashboard', templateUrl: './admin-dashboard.page.html', styleUrls: ['./admin-dashboard.page.scss'] })
export class AdminDashboardPage implements OnInit {
  dados: Transparencia | null = null;
  loading = true;
  constructor(private svc: TransparenciaService) {}
  ngOnInit() { this.svc.indicadores().subscribe({ next: d => { this.dados = d; this.loading = false; }, error: () => this.loading = false }); }
}
