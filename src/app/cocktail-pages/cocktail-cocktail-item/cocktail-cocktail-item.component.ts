import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CocktailsService, Drink, FilterDrink } from 'src/app/services/cocktails.service';

@Component({
  selector: 'fd-cocktail-cocktail-item',
  templateUrl: './cocktail-cocktail-item.component.html',
  styleUrls: ['./cocktail-cocktail-item.component.css']
})
export class CocktailCocktailItemComponent {
  cocktails$!: Observable<Drink[]>;

  constructor(private cocktailService: CocktailsService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((params) => {
        if(params.has('type')) {
          console.log(params.get('type'))
          this.handleObservable(params.get('type')!);
        }
      });
  }

  private handleObservable(type: string) {
    switch(type) {
      case 'name':
      case 'letter': {
        this.cocktails$ = this.cocktailService.search(type, '');
        break;
      }
      case 'random': {
        this.cocktails$ = this.cocktailService.random();
        break;
      }
      case 'ingredient':
      case 'category':
      case 'alcohol':
      case 'glass': {
        this.cocktails$ = this.covertFilterDrinkToDrink(type, '');
        break;
      }
    }
  }

  private covertFilterDrinkToDrink(type: string, param: ''): Observable<any> {
    let drinkList: Drink[] = [];
    this.cocktailService.filter(type, param)
      .subscribe((list: FilterDrink[] | string) => {
        if(this.isString(list)) {
          return of(list);
        } else {
          list.forEach(ele => {
            drinkList.push(this.getDrinkOnId(ele.idDrink));
          });
          return of(drinkList);
        }
      });
    return of(drinkList);
  }

  private isString(param: FilterDrink[] | string): param is string {
    return (param as string).charAt !== undefined;
  }

  private getDrinkOnId(id: string): Drink {
    let returnDrink: Drink = {
      drinkID: '',
      drinkName: '',
      tags: '',
      category: '',
      IBA: '',
      alcoholic: '',
      glass: '',
      instructions: '',
      drinkThumb: '',
      ingredients: [],
      imageSource: '',
      imageAttribution: '',
      creativeCommonsConfirmed: '',
      dateModified: ''
    };
    this.cocktailService.lookup(id)
      .subscribe((drink: Drink[]) => {
        returnDrink = drink[0];
      });
    return returnDrink;
  }

}
