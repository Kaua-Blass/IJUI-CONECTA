import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { IdeiasService } from '../../services/ideias.service';

@Component({ selector: 'app-nova-ideia', templateUrl: './nova-ideia.page.html', styleUrls: ['./nova-ideia.page.scss'] })
export class NovaIdeiaPage {
  form: FormGroup;
  categorias = ['Mobilidade urbana', 'Meio Ambiente', 'Saúde', 'Educação', 'Cultura e lazer', 'Tecnologia', 'Segurança', 'Outros'];

  constructor(private fb: FormBuilder, private svc: IdeiasService, private router: Router,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.form = this.fb.group({
      titulo:    ['', [Validators.required, Validators.minLength(5)]],
      descricao: ['', [Validators.required, Validators.minLength(20)]],
      categoria: ['', Validators.required]
    });
  }

  async enviar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const loading = await this.loadingCtrl.create({ message: 'Publicando ideia...' });
    await loading.present();
    this.svc.criar(this.form.value).subscribe({
      next: async () => {
        loading.dismiss();
        const t = await this.toastCtrl.create({ message: 'Ideia publicada! A comunidade já pode apoiar.', duration: 3000, color: 'success', position: 'top' });
        t.present();
        this.router.navigate(['/ideias'], { replaceUrl: true });
      },
      error: async () => {
        loading.dismiss();
        const t = await this.toastCtrl.create({ message: 'Erro ao publicar. Tente novamente.', duration: 2500, color: 'danger', position: 'top' });
        t.present();
      }
    });
  }
}
