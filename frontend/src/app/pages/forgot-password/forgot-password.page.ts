import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-forgot-password', templateUrl: './forgot-password.page.html', styleUrls: ['./forgot-password.page.scss'] })
export class ForgotPasswordPage {
  form: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastCtrl: ToastController) {
    this.form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  }
  async enviar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.auth.recover(this.form.value.email).subscribe(async () => {
      const t = await this.toastCtrl.create({ message: 'Link de redefinição enviado! Verifique seu e-mail.', duration: 3500, color: 'success', position: 'top' });
      t.present(); this.router.navigate(['/login']);
    });
  }
}
