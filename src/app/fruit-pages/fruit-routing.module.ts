import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { FruitDetailsComponent } from './fruit-details/fruit-details.component';
import { FruitHomeComponent } from './fruit-home/fruit-home.component';
import { FruitListComponent } from './fruit-list/fruit-list.component';
import { fruitListMatch } from './utility/fruit-list-match.guard';

const routes: Routes = [
  {
    path: '',
    component: FruitHomeComponent
  },
  {
    path: ':type',
    component: FruitListComponent,
    canMatch: [fruitListMatch]
  },
  {
    path: 'details/:id',
    component: FruitDetailsComponent
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
export class FruitRoutingModule { }
