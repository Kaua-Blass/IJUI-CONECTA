import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NotificacoesService } from './services/notificacoes.service';
import { AuthService } from './services/auth.service';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private push: NotificacoesService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      // Push notifications só em dispositivo nativo (Android/iOS)
      if (this.platform.is('capacitor') && this.auth.isLoggedIn()) {
        this.push.initPush();
      }
    });
  }
}
