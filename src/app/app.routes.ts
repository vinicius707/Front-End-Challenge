import { Routes } from '@angular/router';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', redirectTo: '/consulta', pathMatch: 'full' },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'cadastro', component: CadastroComponent },
];
