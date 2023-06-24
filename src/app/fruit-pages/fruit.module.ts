import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FruitRoutingModule } from './fruit-routing.module';
import { FruitHomeComponent } from './fruit-home/fruit-home.component';
import { FruitListComponent } from './fruit-list/fruit-list.component';
import { FruitNavigatorComponent } from './fruit-navigator/fruit-navigator.component';
import { FruitSelectorComponent } from './fruit-selector/fruit-selector.component';


@NgModule({
  declarations: [
    FruitHomeComponent,
    FruitListComponent,
    FruitNavigatorComponent,
    FruitSelectorComponent,
  ],
  imports: [
    CommonModule,
    FruitRoutingModule
  ]
})
export class FruitModule { }
