import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MarcacoesCriarComponent } from './components/marcacoes-criar/marcacoes-criar.component';
import { MarcacoesEditarComponent } from './components/marcacoes-editar/marcacoes-editar.component';
import { MarcacoesEliminarComponent } from './components/marcacoes-eliminar/marcacoes-eliminar.component';

export const routes: Routes = [
  {path: 'home',
  title: 'Página inicial',
  component: HomeComponent
  },
  {path: 'nova-marcacao',
    title: 'Nova Marcação',
    component: MarcacoesCriarComponent
  },
  { path: 'editar-marcacao/:id',
  title: 'Editar Marcação',
  component: MarcacoesEditarComponent,
  },
  {path: 'eliminar-marcacao/:id',
  title: 'Eliminar Marcação',
  component: MarcacoesEliminarComponent,
}
];
