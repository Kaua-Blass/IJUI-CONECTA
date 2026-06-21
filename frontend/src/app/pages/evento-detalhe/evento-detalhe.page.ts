import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../models';

@Component({ selector: 'app-evento-detalhe', templateUrl: './evento-detalhe.page.html', styleUrls: ['./evento-detalhe.page.scss'] })
export class EventoDetalhePage implements OnInit {
  evento: Evento | null = null;
  constructor(private route: ActivatedRoute, private svc: EventosService) {}
  ngOnInit() { this.svc.buscar(Number(this.route.snapshot.paramMap.get('id'))).subscribe(e => this.evento = e); }
}
