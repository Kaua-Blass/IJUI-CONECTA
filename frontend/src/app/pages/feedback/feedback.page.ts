import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models';

@Component({ selector: 'app-feedback', templateUrl: './feedback.page.html', styleUrls: ['./feedback.page.scss'] })
export class FeedbackPage implements OnInit {
  feedbacks: Feedback[] = [];
  nota = 0;
  form: FormGroup;
  projetos = ['Pavimentação de vias', 'UBS e postos de saúde', 'Escolas municipais', 'Parques e áreas verdes', 'Coleta de lixo', 'Iluminação pública'];

  constructor(private fb: FormBuilder, private svc: FeedbackService, private toastCtrl: ToastController) {
    this.form = this.fb.group({
      projeto:    ['', Validators.required],
      comentario: ['']
    });
  }

  ngOnInit() { this.svc.listar().subscribe(f => this.feedbacks = f); }

  setNota(n: number) { this.nota = n; }

  async enviar() {
    if (!this.nota || this.form.get('projeto')?.invalid) {
      const t = await this.toastCtrl.create({ message: 'Selecione um projeto e uma nota.', duration: 2500, color: 'warning', position: 'top' });
      t.present(); return;
    }
    this.svc.criar({ projeto: this.form.value.projeto, nota: this.nota, comentario: this.form.value.comentario }).subscribe(async (f) => {
      this.feedbacks.unshift(f);
      this.nota = 0;
      this.form.reset();
      const t = await this.toastCtrl.create({ message: 'Avaliação enviada! Obrigado.', duration: 2500, color: 'success', position: 'top' });
      t.present();
    });
  }

  iniciais(nome?: string) { if (!nome) return '?'; return nome.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase(); }
}
