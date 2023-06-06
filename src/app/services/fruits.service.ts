import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { ServiceConstants } from '../constants/service-constants';

@Injectable({
  providedIn: 'root'
})
export class FruitsService {
  private constants = this.serviceConstants.FRUITS_URL;
  private baseUrl = this.serviceConstants.CORS_FIX_URL + this.constants.BASE_FRUITS_URL;

  constructor(private serviceConstants: ServiceConstants, private http: HttpClient) { }

  all() {
    const url: string = this.baseUrl + this.constants.ALL_FRUITS_URL;
    return this.http.get<Fruit[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  nutrition(nutrition: string, min?: string, max?: string) {
    let url: string = this.baseUrl + nutrition + '?';

    if(min && max) {
      url += 'min=' + min + '&max=' + max;
    } else if(min) {
      url += 'min=' + min;
    } else if(max) {
      url += 'max=' + max;
    }

    return this.http.get<Fruit[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  family(family: string) {
    const url: string = this.baseUrl + this.constants.FAMILY_FRUITS_URL + family;
    return this.http.get<Fruit[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  genus(genus: string) {
    const url: string = this.baseUrl + this.constants.GENUS_FRUITS_URL + genus;
    return this.http.get<Fruit[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  order(order: string) {
    const url: string = this.baseUrl + this.constants.ORDER_FRUITS_URL + order;
    return this.http.get<Fruit[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  listNutritions() {
    const list: string[] = ['calories', 'fat', 'sugar', 'carbohydrates', 'protein'];
    return of(list)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Helper function to handle general errors coming from api requests
  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(() => new Error('A data error occurred, please try again.'));
  }
}

export interface Fruit {
  name: string;
  id: number;
  family: string;
  order: string;
  genus: string;
  nutritions: Nutritions;
}

export interface Nutritions {
  calories: number;
  fat: number;
  sugar: number;
  carbohydrates: number;
  protein: number;
}
