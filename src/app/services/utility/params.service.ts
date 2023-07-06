import { Injectable } from '@angular/core';

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
}

interface GeneralParams {
  fruit: FruitQueryParams
}

interface FruitQueryParams {
  nutritions: NutritionSubmit,
  term: string
}

export interface NutritionSubmit {
  nutritions: string,
  min: string,
  max: string
}
