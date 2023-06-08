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
  private baseUrl: string = this.serviceConstants.CORS_FIX_URL + this.constants.BASE_COCKTAILS_URL;

  constructor(private serviceConstants: ServiceConstants, private http: HttpClient) { }

  // These are the api call wrappers

  // Search for cocktails
  // The two allowed parameters for this api are name(name) and first letter(letter)
  search(type: string, paramter: string) {
    const url: string = this.baseUrl + this.constants.SEARCH_COCKTAILS_URL + this.getValue(type) + '=' + paramter;
    return this.http.get<DrinkResponse>(url)
      .pipe(
        map((response: DrinkResponse) => {
          return this.condenseObject(response);
        }),
        catchError(this.handleError)
      );
  }

  // Search for ingredients
  // The only allowed parameter is the name(ingredient)
  searchIngredients(paramter: string) {
    const url: string = this.baseUrl + this.constants.SEARCH_COCKTAILS_URL + 'i=' + paramter;
    return this.http.get<IngredientResponse>(url)
      .pipe(
        map((response: IngredientResponse) => {
          return response.ingredients;
        }),
        catchError(this.handleError)
      );
  }

  // Lookup cocktails based on the cocktail's id
  lookup(paramter: string) {
    const url: string = this.baseUrl + this.constants.LOOKUP_COCKTAILS_URL + 'i=' + paramter;
    return this.http.get<DrinkResponse>(url)
      .pipe(
        map((response: DrinkResponse) => {
          return this.condenseObject(response);
        }),
        catchError(this.handleError)
      );
  }

  // Lookup ingredients based on the ingredient's id
  lookupIngredients(paramter: string) {
    const url: string = this.baseUrl + this.constants.LOOKUP_COCKTAILS_URL + 'iid=' + paramter;
    return this.http.get<IngredientResponse>(url)
      .pipe(
        map((response: IngredientResponse) => {
          return response.ingredients;
        }),
        catchError(this.handleError)
      );
  }

  // Gets a random cocktail
  random() {
    const url: string = this.baseUrl + this.constants.RANDOM_COCKTAILS_URL;
    return this.http.get<DrinkResponse>(url)
      .pipe(
        map((response: DrinkResponse) => {
          return this.condenseObject(response);
        }),
        catchError(this.handleError)
      );
  }

  // Filters cocktails based on different conditions
  // The different parameters allowed are ingredients, alchoholic, category, and glass
  filter(type: string, paramter: string) {
    const url: string = this.baseUrl + this.constants.FILTER_COCKTAILS_URL + this.getValue(type) + '=' + paramter;
    return this.http.get<FilterDrinkResponse>(url)
      .pipe(
        map((response: FilterDrinkResponse) => {
          return response.drinks;
        }),
        catchError(this.handleError)
      );
  }

  // Lists all available categories that can be filtered by
  listCategories() {
    const url: string = this.baseUrl + this.constants.LIST_COCKTAILS_URL + 'c=list';
    return this.http.get<CategoryListResponse>(url)
      .pipe(
        map((response: CategoryListResponse) => {
          return response.drinks;
        }),
        catchError(this.handleError)
      );
  }

  // Lists all available ingredients that can be filtered by
  listIngredients() {
    const url: string = this.baseUrl + this.constants.LIST_COCKTAILS_URL + 'i=list';
    return this.http.get<IngredientListResponse>(url)
      .pipe(
        map((response: IngredientListResponse) => {
          return response.drinks;
        }),
        catchError(this.handleError)
      );
  }

  // Lists all available glasses that can be filtered by
  listGlasses() {
    const url: string = this.baseUrl + this.constants.LIST_COCKTAILS_URL + 'g=list';
    return this.http.get<GlassesListResponse>(url)
      .pipe(
        map((response: GlassesListResponse) => {
          return response.drinks;
        }),
        catchError(this.handleError)
      );
  }

  // Lists all alchohol that can be filted by
  listAlchohol() {
    const url: string = this.baseUrl + this.constants.LIST_COCKTAILS_URL + 'a=list';
    return this.http.get<AlchoholListResponse>(url)
      .pipe(
        map((response: AlchoholListResponse) => {
          return response.drinks;
        }),
        catchError(this.handleError)
      );
  }

  // These are the helper functions

  // Retrives the value from the enum for the type of parameter
  private getValue(type: string): string {
    const indexOfType = Object.keys(Type).indexOf(type);
    return Object.values(Type)[indexOfType];
  }

  // Condenses the cocktail object returned by the apis
  // Original object has a bunch of properties not needed
  private condenseObject(response: DrinkResponse): Drink[] {
    let drinks: Drink[] = [];
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
      drinks.push(drink);
    }
    return drinks;
  }

  // Make all ingredient properties into a list of ingredients
  // Original object has numbered ingredient properties instead of just one ingredient property
  private compileIngredients(drinkItem: DrinkItem): Ingredient[] {
    let ingredients: Ingredient[] = [];
    if(drinkItem.strIngredient1) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient1, measure: drinkItem.strMeasure1};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient2) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient2, measure: drinkItem.strMeasure2};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient3) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient3, measure: drinkItem.strMeasure3};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient4) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient4, measure: drinkItem.strMeasure4};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient5) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient5, measure: drinkItem.strMeasure5};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient6) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient6, measure: drinkItem.strMeasure6};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient7) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient7, measure: drinkItem.strMeasure7};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient8) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient8, measure: drinkItem.strMeasure8};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient9) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient9, measure: drinkItem.strMeasure9};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient10) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient10, measure: drinkItem.strMeasure10};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient11) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient11, measure: drinkItem.strMeasure11};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient12) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient12, measure: drinkItem.strMeasure12};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient13) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient13, measure: drinkItem.strMeasure13};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient14) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient14, measure: drinkItem.strMeasure14};
      ingredients.push(ingredient);
    }
    if(drinkItem.strIngredient15) {
      let ingredient: Ingredient = {ingredient: drinkItem.strIngredient15, measure: drinkItem.strMeasure15};
      ingredients.push(ingredient);
    }

    return ingredients;
  }

  // Helper function to handle general errors coming from api requests
  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(() => new Error('A data error occurred, please try again.'));
  }
}

// enum mapping for all the api parameters
enum Type {
  name = 's',
  letter = 'f',
  ingredient = 'i',
  alcoholic = 'a',
  category = 'c',
  glass = 'g',
}

// Interfaces for the api calls

// The improved Drink object that will be handled
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

// Ingredient interface used by the Drink interface
export interface Ingredient {
  ingredient: string;
  measure?: string;
}

// Interface used to hold the response for cocktails
interface DrinkResponse {
  drinks: DrinkItem[];
}

// The original drink object 
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

// Interface used to hold the response for ingredients
interface IngredientResponse {
  ingredients: IngredientItem[];
}

// The actual ingredient object
export interface IngredientItem {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: string;
  strAlcohol: string;
  strABV: string;
}

// Interface used to hold the response from the filter endpoint
interface FilterDrinkResponse {
  drinks: FilterDrink[];
}

// The object recieved when using a filter endpoint
export interface FilterDrink {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

// Interface used to hold the response for the list of categories
interface CategoryListResponse {
  drinks: CategoryList[];
}

// The category list object
export interface CategoryList {
  strCategory: string;
}

// Interface used to hold the response for the list of ingredients
interface IngredientListResponse {
  drinks: IngredientList[];
}

// The ingredient list object
export interface IngredientList {
  strIngredient1: string;
}

// Interface used to hold the response for the list of glasses
interface GlassesListResponse {
  drinks: GlassesList[];
}

// The glasses list object
export interface GlassesList {
  strGlass: string;
}

// Interface used to hold the response for the list of alchohol
interface AlchoholListResponse {
  drinks: AlchoholList[];
}

// The alchohol list object
export interface AlchoholList {
  strAlchoholic: string;
}
