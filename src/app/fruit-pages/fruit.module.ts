import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FruitRoutingModule } from './fruit-routing.module';
import { FruitHomeComponent } from './fruit-home/fruit-home.component';


@NgModule({
  declarations: [
    FruitHomeComponent
  ],
  imports: [
    CommonModule,
    FruitRoutingModule
  ]
})
export class FruitModule { }
