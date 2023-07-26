import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CocktailsService, Drink } from 'src/app/services/cocktails.service';

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
          this.handleObservable(params.get('type')!);
        }
      });

    this.cocktails$ = this.cocktailService.random();
  }

  private handleObservable(type: string) {
    switch(type) {
      case 'name': {
        break;
      }
      case 'letter': {
        break;
      }
      case 'random': {
        this.cocktails$ = this.cocktailService.random();
        break;
      }
      case 'ingredient': {
        break;
      }
      case 'category': {
        break;
      }
      case 'alcohol': {
        break;
      }
      case 'glass': {
        break;
      }
    }
  }

}
