import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent {
  isCocktail: boolean = false;
  isIngredient: boolean = false;
  isList: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((params) => {
        if(params.has('search')) {
          this.reset();
          let search: string = params.get('search')!;

          if(search === 'cocktail') {
            this.isCocktail = true;
          } else if(search === 'ingredient') {
            this.isIngredient = true;
          } else if(search === 'list') {
            this.isList = true;
          }
        }
      });
  }

  private reset() {
    this.isCocktail = false;
    this.isIngredient = false;
    this.isList = false;
  }

}
