import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models';

@Component({ selector: 'app-perfil', templateUrl: './perfil.page.html', styleUrls: ['./perfil.page.scss'] })
export class PerfilPage implements OnInit {
  usuario: Usuario | null = null;
  editForm: FormGroup;
  senhaForm: FormGroup;
  abaSel: 'dados' | 'senha' | 'notif' = 'dados';

  constructor(private auth: AuthService, private fb: FormBuilder,
              private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.editForm = this.fb.group({
      nome:  ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.senhaForm = this.fb.group({
      senhaAtual: ['', Validators.required],
      novaSenha:  ['', [Validators.required, Validators.minLength(6)]],
      confirmar:  ['', Validators.required]
    }, { validators: (g: FormGroup) => g.get('novaSenha')?.value === g.get('confirmar')?.value ? null : { diferentes: true } });
  }

  ngOnInit() { this.carregarUsuario(); }
  ionViewWillEnter() { this.carregarUsuario(); }

  carregarUsuario() {
    this.usuario = this.auth.getUser();
    if (this.usuario) this.editForm.patchValue({ nome: this.usuario.nome, email: this.usuario.email });
  }

  iniciais() { if (!this.usuario) return 'U'; return this.usuario.nome.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase(); }

  async salvarDados() {
    if (this.editForm.invalid) { this.editForm.markAllAsTouched(); return; }
    this.auth.updatePerfil(this.editForm.value).subscribe(async () => {
      const t = await this.toastCtrl.create({ message: 'Dados atualizados!', duration: 2500, color: 'success', position: 'top' });
      t.present();
    });
  }

  async salvarSenha() {
    if (this.senhaForm.invalid) { this.senhaForm.markAllAsTouched(); return; }
    const { senhaAtual, novaSenha } = this.senhaForm.value;
    this.auth.updatePerfil({ senhaAtual, novaSenha }).subscribe(async () => {
      const t = await this.toastCtrl.create({ message: 'Senha alterada com sucesso!', duration: 2500, color: 'success', position: 'top' });
      t.present();
      this.senhaForm.reset();
    });
  }

  async confirmarLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Sair',
      message: 'Deseja sair da sua conta?',
      buttons: [{ text: 'Cancelar', role: 'cancel' }, { text: 'Sair', handler: () => this.auth.logout() }]
    });
    alert.present();
  }
}
