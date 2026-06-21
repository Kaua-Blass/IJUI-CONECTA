import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { NoticiasService } from '../../../services/noticias.service';

@Component({ selector: 'app-admin-noticia-form', templateUrl: './admin-noticia-form.page.html', styleUrls: ['./admin-noticia-form.page.scss'] })
export class AdminNoticiaFormPage implements OnInit {
  form: FormGroup;
  editando = false;
  id: number | null = null;
  categorias = ['saude','educacao','infraestrutura','cultura','meio_ambiente'];

  constructor(private fb: FormBuilder, private svc: NoticiasService, private route: ActivatedRoute,
              private router: Router, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.form = this.fb.group({
      titulo:    ['', Validators.required],
      conteudo:  ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.id = Number(id);
      this.svc.buscar(this.id).subscribe(n => this.form.patchValue({ titulo: n.titulo, conteudo: n.conteudo, categoria: n.categoria }));
    }
  }

  async salvar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const loading = await this.loadingCtrl.create({ message: 'Salvando...' });
    await loading.present();
    const fd = new FormData();
    Object.entries(this.form.value).forEach(([k, v]) => fd.append(k, v as string));
    const req = this.editando ? this.svc.editar(this.id!, fd) : this.svc.criar(fd);
    req.subscribe(async () => {
      loading.dismiss();
      const t = await this.toastCtrl.create({ message: this.editando ? 'Notícia atualizada!' : 'Notícia criada!', duration: 2500, color: 'success', position: 'top' });
      t.present();
      this.router.navigate(['/admin/noticias']);
    });
  }
}
