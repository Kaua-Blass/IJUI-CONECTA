import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { ReclamacoesService } from '../../services/reclamacoes.service';

@Component({
  selector: 'app-nova-reclamacao',
  templateUrl: './nova-reclamacao.page.html',
  styleUrls: ['./nova-reclamacao.page.scss']
})
export class NovaReclamacaoPage {
  form: FormGroup;
  fotoBase64: string | null = null;
  coords: { lat: number; lng: number } | null = null;

  categorias = [
    { v: 'buraco',     l: 'Buraco na via' },
    { v: 'iluminacao', l: 'Iluminação pública' },
    { v: 'lixo',       l: 'Coleta de lixo' },
    { v: 'poda',       l: 'Poda de árvores' },
    { v: 'transito',   l: 'Trânsito' },
    { v: 'outros',     l: 'Outros' }
  ];

  constructor(
    private fb: FormBuilder,
    private svc: ReclamacoesService,
    private router: Router,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.form = this.fb.group({
      categoria: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  async tirarFoto() {
    if (!this.platform.is('capacitor')) {
      const t = await this.toastCtrl.create({ message: 'Câmera disponível apenas no app Android.', duration: 2500, color: 'warning', position: 'top' });
      t.present(); return;
    }
    try {
      const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
      const foto = await Camera.getPhoto({ quality: 80, allowEditing: false, resultType: CameraResultType.Base64, source: CameraSource.Prompt });
      this.fotoBase64 = foto.base64String || null;
    } catch { /* cancelado */ }
  }

  removerFoto() { this.fotoBase64 = null; }

  async obterLocalizacao() {
    if (!this.platform.is('capacitor')) {
      // No browser usa a API nativa do navegador
      if (!navigator.geolocation) {
        const t = await this.toastCtrl.create({ message: 'Geolocalização não suportada neste navegador.', duration: 2500, color: 'warning', position: 'top' });
        t.present(); return;
      }
      navigator.geolocation.getCurrentPosition(
        async pos => {
          this.coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          const t = await this.toastCtrl.create({ message: 'Localização obtida!', duration: 2000, color: 'success', position: 'top' });
          t.present();
        },
        async () => {
          const t = await this.toastCtrl.create({ message: 'Não foi possível obter a localização.', duration: 2500, color: 'warning', position: 'top' });
          t.present();
        }
      );
      return;
    }
    try {
      const { Geolocation } = await import('@capacitor/geolocation');
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      this.coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      const t = await this.toastCtrl.create({ message: 'Localização obtida!', duration: 2000, color: 'success', position: 'top' });
      t.present();
    } catch {
      const t = await this.toastCtrl.create({ message: 'Não foi possível obter a localização.', duration: 2500, color: 'warning', position: 'top' });
      t.present();
    }
  }

  async enviar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const loading = await this.loadingCtrl.create({ message: 'Registrando reclamação...' });
    await loading.present();

    const fd = new FormData();
    fd.append('categoria', this.form.value.categoria);
    fd.append('descricao', this.form.value.descricao);
    if (this.coords) { fd.append('latitude', String(this.coords.lat)); fd.append('longitude', String(this.coords.lng)); }
    if (this.fotoBase64) fd.append('foto', this.fotoBase64);

    this.svc.criar(fd).subscribe({
      next: async r => {
        loading.dismiss();
        const t = await this.toastCtrl.create({ message: `Protocolo ${r.protocolo} criado!`, duration: 3000, color: 'success', position: 'top' });
        t.present();
        this.router.navigate(['/reclamacoes'], { replaceUrl: true });
      },
      error: async () => {
        loading.dismiss();
        const t = await this.toastCtrl.create({ message: 'Erro ao enviar. Tente novamente.', duration: 2500, color: 'danger', position: 'top' });
        t.present();
      }
    });
  }
}
