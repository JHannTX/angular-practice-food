import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceConstants } from '../constants/service-constants';
import { CategoryList, Ingredient } from './cocktails.service';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private constants = this.serviceConstants.MEALS_URL;
  private baseUrl = this.serviceConstants.CORS_FIX_URL + this.constants.BASE_MEALS_URL;

  constructor(private serviceConstants: ServiceConstants, private http: HttpClient) { }

  // These are the api call wrappers

  // Search for meals
  // The two allowed parameters are the name and first letter(letter)
  search(type: string, parameter: string) {
    const url: string = this.baseUrl + this.constants.SEARCH_MEALS_URL + this.getValue(type) + '=' + parameter;
    return this.http.get<MealResponse>(url)
      .pipe(
        map((response: MealResponse) => {
          return this.condenseObject(response);
        }),
        catchError(this.handleError)
      );
  }

  // Lookup meals based on the meal's id
  lookup(parameter: string) {
    const url = this.baseUrl + this.constants.LOOKUP_MEALS_URL + parameter;
    return this.http.get<MealResponse>(url)
      .pipe(
        map((response: MealResponse) => {
          return response.meals;
        }),
        catchError(this.handleError)
      );
  }

  // Gets a random meal 
  random() {
    const url = this.baseUrl + this.constants.RANDOM_MEALS_URL;
    return this.http.get<MealResponse>(url)
      .pipe(
        map((response: MealResponse) => {
          return response.meals;
        }),
        catchError(this.handleError)
      );
  }

  // Lists the categories with additional information about the category
  categories() {
    const url = this.baseUrl + this.constants.CATEGORIES_MEALS_URL;
    return this.http.get<CategoryResponse>(url)
      .pipe(
        map((response: CategoryResponse) => {
          return response.categories;
        }),
        catchError(this.handleError)
      );
  }

  // Lists all available categories that can be filtered by
  listCategories() {
    const url = this.baseUrl + this.constants.LIST_MEALS_URL + 'c=list';
    return this.http.get<CategoryListResponse>(url)
      .pipe(
        map((response: CategoryListResponse) => {
          return response.meals;
        }),
        catchError(this.handleError)
      );
  }

  // Lists all available areas that can be filtered by
  listAreas() {
    const url = this.baseUrl + this.constants.LIST_MEALS_URL + 'a=list';
    return this.http.get<AreaListResponse>(url)
      .pipe(
        map((response: AreaListResponse) => {
          return response.meals;
        }),
        catchError(this.handleError)
      );
  }

  // Lists all available ingredients that can be filtered by
  listIngredients() {
    const url = this.baseUrl + this.constants.LIST_MEALS_URL + 'i=list';
    return this.http.get<IngredientListResponse>(url)
      .pipe(
        map((response: IngredientListResponse) => {
          return response.meals;
        }),
        catchError(this.handleError)
      );
  }

  // Filters meals based on different conditions
  // The different parameters allowed are ingredient, area, and category
  filter(type: string, parameter: string) {
    const url = this.baseUrl + this.constants.FILTER_MEALS_URL + this.getValue(type) + '=' + parameter;
    return this.http.get<FilterMealResponse>(url)
      .pipe(
        map((response: FilterMealResponse) => {
          return response.meals;
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

  // Condenses the meal object returned by the apis
  // Original object has a bunch of properties not needed
  private condenseObject(response: MealResponse): Meal[] {
    let meals: Meal[] = [];
    for(let mealItem of response.meals) {
      let meal: Meal = {
        mealId: mealItem.idMeal,
        meal: mealItem.strMeal,
        category: mealItem.strCategory,
        area: mealItem.strArea,
        instructions: mealItem.strInstructions,
        mealThumb: mealItem.strMealThumb,
        tags: mealItem.strTags,
        youtube: mealItem.strYoutube,
        ingredients: this.compileIngredients(mealItem),
        source: mealItem.strSource,
        imageSource: mealItem.strImageSource,
        creativeCommonsConfirmed: mealItem.strCreativeCommonsConfirmed,
        dateModified: mealItem.dateModified,
      }
      meals.push(meal);
    }
    return meals;
  }

  // Make all ingredient properties into a list of ingredients
  // Original object has numbered ingredient properties instead of just one ingredient property
  private compileIngredients(mealItem: MealItem): Ingredient[] {
    let ingredients: Ingredient[] = [];
    if(mealItem.strIngredient1 && mealItem.strIngredient1 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient1, measure: mealItem.strMeasure1};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient2 && mealItem.strIngredient2 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient2, measure: mealItem.strMeasure2};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient3 && mealItem.strIngredient3 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient3, measure: mealItem.strMeasure3};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient4 && mealItem.strIngredient4 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient4, measure: mealItem.strMeasure4};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient5 && mealItem.strIngredient5 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient5, measure: mealItem.strMeasure5};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient6 && mealItem.strIngredient6 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient6, measure: mealItem.strMeasure6};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient7 && mealItem.strIngredient7 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient7, measure: mealItem.strMeasure7};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient8 && mealItem.strIngredient8 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient8, measure: mealItem.strMeasure8};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient9 && mealItem.strIngredient9 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient9, measure: mealItem.strMeasure9};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient10 && mealItem.strIngredient10 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient10, measure: mealItem.strMeasure10};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient11 && mealItem.strIngredient11 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient11, measure: mealItem.strMeasure11};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient12 && mealItem.strIngredient12 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient12, measure: mealItem.strMeasure12};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient13 && mealItem.strIngredient13 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient13, measure: mealItem.strMeasure13};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient14 && mealItem.strIngredient14 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient14, measure: mealItem.strMeasure14};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient15 && mealItem.strIngredient15 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient15, measure: mealItem.strMeasure15};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient16 && mealItem.strIngredient16 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient16, measure: mealItem.strMeasure16};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient17 && mealItem.strIngredient17 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient17, measure: mealItem.strMeasure17};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient18 && mealItem.strIngredient18 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient18, measure: mealItem.strMeasure18};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient19 && mealItem.strIngredient19 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient19, measure: mealItem.strMeasure19};
      ingredients.push(ingredient);
    }
    if(mealItem.strIngredient20 && mealItem.strIngredient20 != "") {
      let ingredient: Ingredient = {ingredient: mealItem.strIngredient20, measure: mealItem.strMeasure20};
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
  category = 'c',
  area = 'a',
}

// Interfaces for the api calls

// Interface used to hold the response from the filter endpoint
interface FilterMealResponse {
  meals: FilterMeal[];
}

// The object recieved when using a filter endpoint
export interface FilterMeal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

// The interface used to hold the response from the category endpoint
interface CategoryResponse {
  categories: Category[];
}

// The category object that describes the category
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

// Interface used to hold the response for the list of ingredients
interface IngredientListResponse {
  meals: IngredientDescription[];
}

// The ingredient list object
export interface IngredientDescription {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType?: any;
}

// Interface used to hold the response for the list of areas
interface AreaListResponse {
  meals: AreaList[];
}

// The area list object
export interface AreaList {
  strArea: string;
}

// Interface used to hold the response for the list of categories
interface CategoryListResponse {
  meals: CategoryList[];
}

// The improved Meal object that will be handled
export interface Meal {
  mealId: string;
  meal: string;
  category: string;
  area: string;
  instructions: string;
  mealThumb: string;
  tags: string;
  youtube: string;
  ingredients: Ingredient[];
  source?: string;
  imageSource?: any;
  creativeCommonsConfirmed?: any;
  dateModified?: any;
}

// Interface used to hold the response for meal
interface MealResponse {
  meals: MealItem[];
}

// The orginal meal object
interface MealItem {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}
