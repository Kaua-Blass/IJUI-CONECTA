import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { EventosService } from '../../../services/eventos.service';

@Component({ selector: 'app-admin-evento-form', templateUrl: './admin-evento-form.page.html', styleUrls: ['./admin-evento-form.page.scss'] })
export class AdminEventoFormPage implements OnInit {
  form: FormGroup;
  editando = false;
  id: number | null = null;

  constructor(private fb: FormBuilder, private svc: EventosService, private route: ActivatedRoute,
              private router: Router, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.form = this.fb.group({
      titulo:    ['', Validators.required],
      descricao: ['', Validators.required],
      local:     ['', Validators.required],
      data:      ['', Validators.required],
      hora:      ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true; this.id = Number(id);
      this.svc.buscar(this.id).subscribe(e => this.form.patchValue(e));
    }
  }

  async salvar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const loading = await this.loadingCtrl.create({ message: 'Salvando...' });
    await loading.present();
    const req = this.editando ? this.svc.editar(this.id!, this.form.value) : this.svc.criar(this.form.value);
    req.subscribe(async () => {
      loading.dismiss();
      const t = await this.toastCtrl.create({ message: this.editando ? 'Evento atualizado!' : 'Evento criado!', duration: 2500, color: 'success', position: 'top' });
      t.present();
      this.router.navigate(['/admin/eventos']);
    });
  }
}
