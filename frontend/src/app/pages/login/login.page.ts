import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-login', templateUrl: './login.page.html', styleUrls: ['./login.page.scss'] })
export class LoginPage {
  form: FormGroup;
  senhaVisivel = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const loading = await this.loadingCtrl.create({ message: 'Entrando...' });
    await loading.present();

    const { email, senha } = this.form.value;
    this.auth.login(email, senha).subscribe({
      next: (res) => {
        loading.dismiss();
        this.router.navigate([res.usuario.role === 'admin' ? '/admin' : '/home'], { replaceUrl: true });
      },
      error: async () => {
        loading.dismiss();
        const t = await this.toastCtrl.create({
          message: 'E-mail ou senha incorretos.',
          duration: 3000, color: 'danger', position: 'top'
        });
        t.present();
      }
    });
  }

  // Acesso de um clique para demonstração — loga direto sem precisar digitar nada
  async entrarDemo(perfil: 'cidadao' | 'admin') {
    const credenciais = {
      cidadao: { email: 'demo@ijui.gov.br',  senha: '123456' },
      admin:   { email: 'admin@ijui.gov.br', senha: '123456' }
    };
    const loading = await this.loadingCtrl.create({ message: 'Entrando...' });
    await loading.present();

    const { email, senha } = credenciais[perfil];
    this.auth.login(email, senha).subscribe(res => {
      loading.dismiss();
      this.router.navigate([res.usuario.role === 'admin' ? '/admin' : '/home'], { replaceUrl: true });
    });
  }
}
