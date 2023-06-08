import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServiceConstants {
    public CORS_FIX_URL = 'https://jh-cors-solution.herokuapp.com/';

    public COCKTAILS_URL = {
        BASE_COCKTAILS_URL: 'http://www.thecocktaildb.com/api/json/v1/1/',
        SEARCH_COCKTAILS_URL: 'search.php?',
        LOOKUP_COCKTAILS_URL: 'lookup.php?',
        RANDOM_COCKTAILS_URL: 'random.php',
        FILTER_COCKTAILS_URL: 'filter.php?',
        LIST_COCKTAILS_URL: 'list.php?'
    };

    public FRUITS_URL = {
        BASE_FRUITS_URL: 'https://fruityvice.com/api/fruit/',
        ALL_FRUITS_URL: 'all',
        FAMILY_FRUITS_URL: 'family/',
        GENUS_FRUITS_URL: 'genus/',
        ORDER_FRUITS_URL: 'order/',
    };

    public MEALS_URL = {
        BASE_MEALS_URL: 'http://www.themealdb.com/api/json/v1/1/',
        SEARCH_MEALS_URL: 'search.php?',
        LOOKUP_MEALS_URL: 'lookup.php?i=',
        RANDOM_MEALS_URL: 'random.php',
        LIST_MEALS_URL: 'list.php?',
        FILTER_MEALS_URL: 'filter.php?',
        CATEGORIES_MEALS_URL: 'categories.php'
    };
}