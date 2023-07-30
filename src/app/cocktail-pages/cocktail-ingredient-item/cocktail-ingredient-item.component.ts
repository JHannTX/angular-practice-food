import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CocktailsService, IngredientItem } from 'src/app/services/cocktails.service';

@Component({
  selector: 'fd-cocktail-ingredient-item',
  templateUrl: './cocktail-ingredient-item.component.html',
  styleUrls: ['./cocktail-ingredient-item.component.css']
})
export class CocktailIngredientItemComponent {
  ingredients$!: Observable<IngredientItem[]>;

  constructor(private cocktailService: CocktailsService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.ingredients$ = this.cocktailService.searchIngredients('light');
  }
}
