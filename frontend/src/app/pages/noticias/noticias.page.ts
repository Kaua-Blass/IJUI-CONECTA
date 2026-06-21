import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models';

@Component({ selector: 'app-noticias', templateUrl: './noticias.page.html', styleUrls: ['./noticias.page.scss'] })
export class NoticiasPage implements OnInit {
  noticias: Noticia[] = [];
  categorias = ['', 'saude', 'educacao', 'infraestrutura', 'cultura', 'meio_ambiente'];
  labels    =  ['Todas', 'Saúde', 'Educação', 'Infraestrutura', 'Cultura', 'Meio Ambiente'];
  catSel = '';
  loading = true;

  constructor(private svc: NoticiasService) {}
  ngOnInit() { this.carregar(); }

  carregar() {
    this.loading = true;
    this.svc.listar(this.catSel || undefined).subscribe({
      next: r => { this.noticias = r.data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  doRefresh(e: any) { this.carregar(); setTimeout(() => e.target.complete(), 800); }
}
