import { Injectable } from '@angular/core';
import { getIndex } from 'src/app/shared/helper-functions';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
  private params: GeneralParams;

  constructor() {
    this.params = {
      fruit: {
        nutritions: {
          nutritions: 'calories',
          min: '0',
          max: '1000'
        },
        term: ''
      },
      cocktail: {
        name: '',
        letter: '',
        ingredient: '',
        category: '',
        alcohol: '',
        glass: ''
      }
    }
  }

  setNutritionParams(params: NutritionSubmit): NutritionSubmit {
    this.params.fruit.nutritions = params;
    return params;
  }

  getNutritionParams(): NutritionSubmit {
    return this.params.fruit.nutritions;
  }

  setFruitSearch(term: string): string {
    this.params.fruit.term = term;
    return term;
  }

  getFruitSearch(): string {
    return this.params.fruit.term;
  }

  setCocktailSearch(type: string, param: string): string {
    const index = getIndex(this.params.cocktail, type);
    Object.values(this.params.cocktail)[index] = param;
    return param;
  }

  getCocktailSearch(type: string): string {
    const index = getIndex(this.params.cocktail, type);
    return Object.values(this.params.cocktail)[index];
  }
}

interface GeneralParams {
  fruit: FruitQueryParams,
  cocktail: CocktailQueryParams
}

interface FruitQueryParams {
  nutritions: NutritionSubmit,
  term: string
}

interface CocktailQueryParams {
  name: string,
  letter: string,
  ingredient: string,
  category: string,
  alcohol: string,
  glass: string
}

export interface NutritionSubmit {
  nutritions: string,
  min: string,
  max: string
}
