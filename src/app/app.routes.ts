import { Routes } from '@angular/router';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent,
  },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'cadastro', component: CadastroComponent },
];
