import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocktailRoutingModule } from './cocktail-routing.module';
import { CocktailNavigatorComponent } from './cocktail-navigator/cocktail-navigator.component';
import { CocktailHomeComponent } from './cocktail-home/cocktail-home.component';
import { CocktailListItemComponent } from './cocktail-list-item/cocktail-list-item.component';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CocktailCocktailItemComponent } from './cocktail-cocktail-item/cocktail-cocktail-item.component';
import { CocktailIngredientItemComponent } from './cocktail-ingredient-item/cocktail-ingredient-item.component';


@NgModule({
  declarations: [
  
    CocktailNavigatorComponent,
       CocktailHomeComponent,
       CocktailListItemComponent,
       CocktailListComponent,
       CocktailCocktailItemComponent,
       CocktailIngredientItemComponent
  ],
  imports: [
    CommonModule,
    CocktailRoutingModule
  ]
})
export class CocktailModule { }
