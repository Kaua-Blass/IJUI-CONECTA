import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-cadastro', templateUrl: './cadastro.page.html', styleUrls: ['./cadastro.page.scss'] })
export class CadastroPage {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.form = this.fb.group({
      nome:           ['', [Validators.required, Validators.minLength(3)]],
      email:          ['', [Validators.required, Validators.email]],
      cpf:            [''],
      senha:          ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.senhasIguais });
  }

  senhasIguais(g: FormGroup) {
    return g.get('senha')?.value === g.get('confirmarSenha')?.value ? null : { senhasDiferentes: true };
  }

  async cadastrar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const loading = await this.loadingCtrl.create({ message: 'Criando conta...' });
    await loading.present();
    const { nome, email, cpf, senha } = this.form.value;
    this.auth.cadastro({ nome, email, cpf: cpf || undefined, senha }).subscribe({
      next: () => { loading.dismiss(); this.router.navigate(['/home'], { replaceUrl: true }); },
      error: async (e) => {
        loading.dismiss();
        const msg = e.error?.error || 'Erro ao criar conta.';
        const t = await this.toastCtrl.create({ message: msg, duration: 3000, color: 'danger', position: 'top' });
        t.present();
      }
    });
  }
}
