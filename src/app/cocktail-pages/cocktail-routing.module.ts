import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { CocktailHomeComponent } from './cocktail-home/cocktail-home.component';

const routes: Routes = [
  {
    path: '',
    component: CocktailHomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocktailRoutingModule { }
