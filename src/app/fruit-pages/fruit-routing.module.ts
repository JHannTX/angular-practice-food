import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitHomeComponent } from './fruit-home/fruit-home.component';

const routes: Routes = [
  {
    path: '',
    component: FruitHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FruitRoutingModule { }
