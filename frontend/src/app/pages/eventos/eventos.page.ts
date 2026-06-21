import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../models';

@Component({ selector: 'app-eventos', templateUrl: './eventos.page.html', styleUrls: ['./eventos.page.scss'] })
export class EventosPage implements OnInit {
  eventos: Evento[] = [];
  loading = true;
  constructor(private svc: EventosService) {}
  ngOnInit() { this.carregar(); }
  carregar() { this.svc.listar().subscribe({ next: e => { this.eventos = e; this.loading = false; }, error: () => this.loading = false }); }
  doRefresh(e: any) { this.carregar(); setTimeout(() => e.target.complete(), 800); }
}
