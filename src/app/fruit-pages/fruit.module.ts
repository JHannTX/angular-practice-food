import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FruitRoutingModule } from './fruit-routing.module';
import { FruitHomeComponent } from './fruit-home/fruit-home.component';
import { FruitListComponent } from './fruit-list/fruit-list.component';
import { FruitNavigatorComponent } from './fruit-navigator/fruit-navigator.component';
import { FruitSelectorComponent } from './fruit-selector/fruit-selector.component';
import { FruitSearchComponent } from './fruit-search/fruit-search.component';
import { FruitListItemComponent } from './fruit-list-item/fruit-list-item.component';


@NgModule({
  declarations: [
    FruitHomeComponent,
    FruitListComponent,
    FruitNavigatorComponent,
    FruitSelectorComponent,
    FruitSearchComponent,
    FruitListItemComponent,
  ],
  imports: [
    CommonModule,
    FruitRoutingModule
  ]
})
export class FruitModule { }
