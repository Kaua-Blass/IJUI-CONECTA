import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Noticia, Paginated } from '../models';
import { AuthService } from './auth.service';

const MOCK_NOTICIAS: Noticia[] = [
  { id: 1, titulo: 'Plantio de 500 árvores no Parque Municipal inicia esta semana', conteudo: '<p>A Prefeitura Municipal de Ijuí, por meio da Secretaria de Meio Ambiente, inicia nesta semana o projeto de arborização urbana com plantio de 500 mudas de espécies nativas no Parque Municipal.</p><p>As espécies incluem ipê-amarelo, aroeira e cedro. O projeto integra o programa Ijuí Sustentável 2026.</p>', categoria: 'meio_ambiente', secretaria: 'Sec. Meio Ambiente', createdAt: '2026-06-01T10:00:00Z' },
  { id: 2, titulo: 'Obras de pavimentação na Rua XV de Novembro com previsão de conclusão em julho', conteudo: '<p>As obras de recapeamento da Rua XV de Novembro estão em andamento e a previsão de conclusão é para o mês de julho. A via receberá nova camada asfáltica em toda sua extensão.</p>', categoria: 'infraestrutura', secretaria: 'Sec. de Obras', createdAt: '2026-05-29T09:00:00Z' },
  { id: 3, titulo: 'UBS do bairro Roque González passa por reforma e ampliação', conteudo: '<p>A Unidade Básica de Saúde do bairro Roque González receberá reforma completa e ampliação de sua área de atendimento. As obras começam em julho e têm duração prevista de 90 dias.</p>', categoria: 'saude', secretaria: 'Sec. de Saúde', createdAt: '2026-05-27T08:00:00Z' },
  { id: 4, titulo: 'Escola Municipal Castelo Branco recebe novos equipamentos de informática', conteudo: '<p>Noventa computadores novos foram entregues à Escola Municipal Castelo Branco, beneficiando mais de 600 alunos com acesso à tecnologia para atividades de ensino.</p>', categoria: 'educacao', secretaria: 'Sec. de Educação', createdAt: '2026-05-25T07:00:00Z' },
  { id: 5, titulo: 'Festival de Cultura e Arte de Ijuí acontece em julho no Teatro Municipal', conteudo: '<p>O Festival de Cultura e Arte de Ijuí retorna em julho com shows, exposições e apresentações teatrais. A programação completa será divulgada em breve.</p>', categoria: 'cultura', secretaria: 'Sec. de Cultura', createdAt: '2026-05-20T11:00:00Z' },
];

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  listar(categoria?: string, page = 1, perPage = 10): Observable<Paginated<Noticia>> {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      let data = categoria ? MOCK_NOTICIAS.filter(n => n.categoria === categoria) : MOCK_NOTICIAS;
      return of({ data, total: data.length, page, perPage });
    }
    let p = new HttpParams().set('page', page).set('perPage', perPage);
    if (categoria) p = p.set('categoria', categoria);
    return this.http.get<Paginated<Noticia>>(`${environment.apiUrl}/news`, { params: p });
  }

  buscar(id: number): Observable<Noticia> {
    if (this.auth.getToken()?.startsWith('demo-token')) {
      return of(MOCK_NOTICIAS.find(n => n.id === id) || MOCK_NOTICIAS[0]);
    }
    return this.http.get<Noticia>(`${environment.apiUrl}/news/${id}`);
  }

  criar(dados: FormData) { return this.http.post<Noticia>(`${environment.apiUrl}/news`, dados); }
  editar(id: number, dados: FormData) { return this.http.put<Noticia>(`${environment.apiUrl}/news/${id}`, dados); }
  excluir(id: number) { return this.http.delete(`${environment.apiUrl}/news/${id}`); }
}
