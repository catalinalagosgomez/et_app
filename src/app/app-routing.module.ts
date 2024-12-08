import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'home-alumno', loadChildren: () => import('./pages/home-alumno/home-alumno.module').then(m => m.HomeAlumnoPageModule) },
  { path: 'historial-asistencia', loadChildren: () => import('./pages/historial-asistencia/historial-asistencia.module').then(m => m.HistorialAsistenciaPageModule) },
  { path: 'change-password', loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule) },
  { path: 'docenteqr', loadChildren: () => import('./pages/docenteqr/docenteqr.module').then(m => m.DocenteqrPageModule) },
  { path: 'asistencia', loadChildren: () => import('./pages/asistencia/asistencia.module').then(m => m.AsistenciaPageModule) },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  { path: 'sign-up', loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule) },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  { path: 'forgot-password', loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
  {
    path: 'asignatura',
    loadChildren: () => import('./pages/asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./pages/qr-scanner/qr-scanner.module').then( m => m.QrScannerPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
