import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash',          loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule) },
  { path: 'login',           loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'cadastro',        loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroPageModule) },
  { path: 'forgot-password', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },

  { path: 'home',            loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'noticias',        loadChildren: () => import('./pages/noticias/noticias.module').then(m => m.NoticiasPageModule), canActivate: [AuthGuard] },
  { path: 'noticias/:id',    loadChildren: () => import('./pages/noticia-detalhe/noticia-detalhe.module').then(m => m.NoticiaDetalhePageModule), canActivate: [AuthGuard] },
  { path: 'eventos',         loadChildren: () => import('./pages/eventos/eventos.module').then(m => m.EventosPageModule), canActivate: [AuthGuard] },
  { path: 'eventos/:id',     loadChildren: () => import('./pages/evento-detalhe/evento-detalhe.module').then(m => m.EventoDetalhePageModule), canActivate: [AuthGuard] },
  { path: 'reclamacoes',     loadChildren: () => import('./pages/reclamacoes/reclamacoes.module').then(m => m.ReclamacoesPageModule), canActivate: [AuthGuard] },
  { path: 'reclamacoes/nova',loadChildren: () => import('./pages/nova-reclamacao/nova-reclamacao.module').then(m => m.NovaReclamacaoPageModule), canActivate: [AuthGuard] },
  { path: 'reclamacoes/:id', loadChildren: () => import('./pages/detalhe-reclamacao/detalhe-reclamacao.module').then(m => m.DetalheReclamacaoPageModule), canActivate: [AuthGuard] },
  { path: 'ideias',          loadChildren: () => import('./pages/ideias/ideias.module').then(m => m.IdeiasPageModule), canActivate: [AuthGuard] },
  { path: 'ideias/nova',     loadChildren: () => import('./pages/nova-ideia/nova-ideia.module').then(m => m.NovaIdeiaPageModule), canActivate: [AuthGuard] },
  { path: 'feedback',        loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackPageModule), canActivate: [AuthGuard] },
  { path: 'transparencia',   loadChildren: () => import('./pages/transparencia/transparencia.module').then(m => m.TransparenciaPageModule), canActivate: [AuthGuard] },
  { path: 'perfil',          loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule), canActivate: [AuthGuard] },
  { path: 'notificacoes',    loadChildren: () => import('./pages/notificacoes/notificacoes.module').then(m => m.NotificacoesPageModule), canActivate: [AuthGuard] },

  // Admin
  { path: 'admin',           loadChildren: () => import('./pages/admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/noticias',  loadChildren: () => import('./pages/admin/admin-noticias/admin-noticias.module').then(m => m.AdminNoticiasPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/noticias/nova', loadChildren: () => import('./pages/admin/admin-noticia-form/admin-noticia-form.module').then(m => m.AdminNoticiaFormPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/noticias/:id',  loadChildren: () => import('./pages/admin/admin-noticia-form/admin-noticia-form.module').then(m => m.AdminNoticiaFormPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/eventos',   loadChildren: () => import('./pages/admin/admin-eventos/admin-eventos.module').then(m => m.AdminEventosPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/eventos/novo', loadChildren: () => import('./pages/admin/admin-evento-form/admin-evento-form.module').then(m => m.AdminEventoFormPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/eventos/:id',  loadChildren: () => import('./pages/admin/admin-evento-form/admin-evento-form.module').then(m => m.AdminEventoFormPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/reclamacoes',  loadChildren: () => import('./pages/admin/admin-reclamacoes/admin-reclamacoes.module').then(m => m.AdminReclamacoesPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/ideias',    loadChildren: () => import('./pages/admin/admin-ideias/admin-ideias.module').then(m => m.AdminIdeiasPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/feedbacks', loadChildren: () => import('./pages/admin/admin-feedbacks/admin-feedbacks.module').then(m => m.AdminFeedbacksPageModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/usuarios',  loadChildren: () => import('./pages/admin/admin-usuarios/admin-usuarios.module').then(m => m.AdminUsuariosPageModule), canActivate: [AuthGuard, AdminGuard] },

  { path: '**', redirectTo: 'splash' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
