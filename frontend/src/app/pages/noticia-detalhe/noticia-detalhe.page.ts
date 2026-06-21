import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models';

@Component({ selector: 'app-noticia-detalhe', templateUrl: './noticia-detalhe.page.html', styleUrls: ['./noticia-detalhe.page.scss'] })
export class NoticiaDetalhePage implements OnInit {
  noticia: Noticia | null = null;
  constructor(private route: ActivatedRoute, private svc: NoticiasService) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.svc.buscar(id).subscribe(n => this.noticia = n);
  }
}
