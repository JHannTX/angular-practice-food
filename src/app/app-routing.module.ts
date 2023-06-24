import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitModule } from './fruit-pages/fruit.module';

const routes: Routes = [
  {
    path: 'fruit',
    loadChildren: () => import('./fruit-pages/fruit.module').then(m => m.FruitModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
