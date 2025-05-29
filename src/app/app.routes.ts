import { Routes } from '@angular/router';
import { ConsultaClientesComponent } from './components/consulta-clientes/consulta-clientes.component';
import { CadastroClientesComponent } from './components/cadastro-clientes/cadastro-clientes.component';
import { EdicaoClientesComponent } from './components/edicao-clientes/edicao-clientes.component';

export const routes: Routes = [
  { path: '', component: ConsultaClientesComponent },
  { path: 'cadastro', component: CadastroClientesComponent },
  { path: 'edicao/:id', component: EdicaoClientesComponent }
];