import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServiceConstants {
    public COCKTAILS_URL = {
        BASE_COCKTAILS_URL: 'http://www.thecocktaildb.com/api/json/v1/1/',
        SEARCH_COCKTAILS_URL: 'search.php',
        LOOKUP_COCKTAILS_URL: 'lookup.php',
        RANDOM_COCKTAILS_URL: 'random.php',
        FILTER_COCKTAILS_URL: 'filter.php',
        LIST_COCKTAILS_URL: 'list.php'
    };
}