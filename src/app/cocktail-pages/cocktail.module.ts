import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocktailRoutingModule } from './cocktail-routing.module';
import { CocktailNavigatorComponent } from './cocktail-navigator/cocktail-navigator.component';
import { CocktailHomeComponent } from './cocktail-home/cocktail-home.component';


@NgModule({
  declarations: [
  
    CocktailNavigatorComponent,
       CocktailHomeComponent
  ],
  imports: [
    CommonModule,
    CocktailRoutingModule
  ]
})
export class CocktailModule { }
