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
        }
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
}

export interface GeneralParams {
  fruit: FruitQueryParams
}

export interface FruitQueryParams {
  nutritions: NutritionSubmit,
}

export interface NutritionSubmit {
  nutritions: string,
  min: string,
  max: string
}
