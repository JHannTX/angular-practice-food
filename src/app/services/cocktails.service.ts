import { Injectable } from '@angular/core';
import { ServiceConstants } from '../constants/service-constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private constants = this.serviceConstants.COCKTAILS_URL;

  constructor(private serviceConstants: ServiceConstants, private http: HttpClient) { }

  search(type: string, paramter: string) {
    const indexOfType = Object.keys(Type).indexOf(type);
    const valueOfType = Object.values(Type)[indexOfType];
    const url: string = this.constants.BASE_COCKTAILS_URL + this.constants.SEARCH_COCKTAILS_URL + '?' + valueOfType + '=' + paramter;
    return this.http.get(url)
      .pipe(
        map((response) => {
          // console.log(response);
          // let drinks: Drinks = this.condenseObject(response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  private condenseObject(response: DrinkResponse): Drinks {
    let drinks: Drinks = { drinks: []};
    for(let drinkItem of response.drinks) {
      let drink: Drink = {
        drinkID: drinkItem.idDrink,
        drinkName: drinkItem.strDrink,
        tags: drinkItem.strTags,
        video: drinkItem.strVideo,
        category: drinkItem.strCategory,
        IBA: drinkItem.strIBA,
        alcoholic: drinkItem.strAlcoholic,
        glass: drinkItem.strGlass,
        instructions: drinkItem.strInstructions,
        drinkThumb: drinkItem.strDrinkThumb,
        ingredients: this.compileIngredients(drinkItem),
        imageSource: drinkItem.strImageSource,
        imageAttribution: drinkItem.strImageAttribution,
        creativeCommonsConfirmed: drinkItem.strCreativeCommonsConfirmed,
        dateModified: drinkItem.dateModified
      }
      drinks.drinks.push(drink);
    }
    return drinks;
  }

  private compileIngredients(drinkItem: DrinkItem): Ingredient[] {
    let ingredients: Ingredient[] = [];
    if(drinkItem.strIngredient1) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient1, measure: drinkItem.strMeasure1};
      ingredients.push(ingredient);
    }

    return ingredients;
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(() => new Error('A data error occurred, please try again.'));
  }
}

enum Type {
  name = 's',
  letter = 'f',
  ingredient = 'i',
  ingredient_id = 'iid',
  alcoholic = 'a',
  category = 'c',
  glass = 'g',
}

interface Drinks {
  drinks: Drink[];
}

export interface Drink {
  drinkID: string;
  drinkName: string;
  drinkAlternate?: string;
  tags: string;
  video?: string;
  category: string;
  IBA: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  drinkThumb: string;
  ingredients: Ingredient[];
  imageSource: string;
  imageAttribution: string;
  creativeCommonsConfirmed: string;
  dateModified: string;
}

export interface Ingredient {
  ingredient: string;
  measure: string;
}

interface DrinkResponse {
  drinks: DrinkItem[];
}

interface DrinkItem {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate?: any;
  strTags: string;
  strVideo?: any;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES?: any;
  strInstructionsDE: string;
  strInstructionsFR?: any;
  strInstructionsIT: string;
  'strInstructionsZH-HANS'?: any;
  'strInstructionsZH-HANT'?: any;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: any;
  strIngredient6?: any;
  strIngredient7?: any;
  strIngredient8?: any;
  strIngredient9?: any;
  strIngredient10?: any;
  strIngredient11?: any;
  strIngredient12?: any;
  strIngredient13?: any;
  strIngredient14?: any;
  strIngredient15?: any;
  strMeasure1: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: any;
  strMeasure5?: any;
  strMeasure6?: any;
  strMeasure7?: any;
  strMeasure8?: any;
  strMeasure9?: any;
  strMeasure10?: any;
  strMeasure11?: any;
  strMeasure12?: any;
  strMeasure13?: any;
  strMeasure14?: any;
  strMeasure15?: any;
  strImageSource: string;
  strImageAttribution: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}
