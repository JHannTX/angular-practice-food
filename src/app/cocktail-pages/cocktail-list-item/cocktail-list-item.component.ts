import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlcoholList, CategoryList, CocktailsService, GlassesList, IngredientList } from 'src/app/services/cocktails.service';

@Component({
  selector: 'fd-cocktail-list-item',
  templateUrl: './cocktail-list-item.component.html',
  styleUrls: ['./cocktail-list-item.component.css']
})
export class CocktailListItemComponent {
  private listC$!: Observable<CategoryList[]>;
  private listI$!: Observable<IngredientList[]>;
  private listG$!: Observable<GlassesList[]>;
  private listA$!: Observable<AlcoholList[]>;
  list$!: Observable<any>;

  constructor(private cocktailService: CocktailsService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((params) => {
        if(params.has('type')) {
          this.listC$ = this.cocktailService.listCategories();
          this.listI$ = this.cocktailService.listIngredients();
          this.listG$ = this.cocktailService.listGlasses();
          this.listA$ = this.cocktailService.listAlcohol();

          this.handleObservable(params.get('type')!);
        }
      });
  }

  private handleObservable(type: string) {
    switch(type) {
      case 'category': {
        this.list$ = this.listC$;
        break;
      }
      case 'ingredient': {
        this.list$ = this.listI$;
        break;
      }
      case 'glass': {
        this.list$ = this.listG$;
        break;
      }
      case 'alcohol': {
        this.list$ = this.listA$;
        break;
      }
    }
  }
}
