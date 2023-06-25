import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitHomeComponent } from './fruit-home/fruit-home.component';
import { FruitListComponent } from './fruit-list/fruit-list.component';

const routes: Routes = [
  {
    path: '',
    component: FruitHomeComponent
  },
  {
    path: ':type',
    component: FruitListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FruitRoutingModule { }
