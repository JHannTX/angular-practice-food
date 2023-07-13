import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { merge, Observable } from 'rxjs';

import { Fruit, FruitsService } from 'src/app/services/fruits.service';
import { NutritionSubmit, ParamsService } from 'src/app/services/utility/params.service';

@Component({
  selector: 'fd-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.css']
})
export class FruitListComponent {
  type: string = '';
  needSearch: boolean = false;
  needSelector: boolean = false;

  fruits$!: Observable<Fruit[]>;
  
  constructor(private activatedRoute: ActivatedRoute, 
    private fruitService: FruitsService,
    private paramsService: ParamsService) {}

  ngOnInit() {
    merge(this.activatedRoute.paramMap, this.activatedRoute.queryParamMap)
      .subscribe((map: ParamMap) => {
        if(map.has('type')) {
          this.handleType(map.get('type')!);
        } else if(map.has('nutritions')) {
          let nutritionParams = this.paramsService.getNutritionParams();
          nutritionParams = this.paramsService.setNutritionParams({
            nutritions: map.get('nutritions') ?? nutritionParams.nutritions,
            min: map.get('min') ?? nutritionParams.min,
            max: map.get('max') ?? nutritionParams.max
          });
        } else if(map.has('term')) {
          let term = this.paramsService.getFruitSearch();
          term = this.paramsService.setFruitSearch(map.get('term') ?? term);
        }

        this.handleObservable();
      });
  }

  onNutritionSubmission(nutrition: NutritionSubmit) {
    this.paramsService.setNutritionParams(nutrition);
    this.fruits$ = this.fruitService.nutrition(nutrition.nutritions, nutrition.min, nutrition.max);
  }

  onSearchSubmission(term: string) {
    this.paramsService.setFruitSearch(term);
    this.handleObservable();
  }

  private handleType(type: string): void {
    this.needSearch = false;
    this.needSelector = false;
    this.type = type;
    if(this.type?.toLowerCase() === 'nutrition') {
      this.needSelector = true;
    } else if(this.type?.toLowerCase() !== 'all') {
      this.needSearch = true;
    }
  }

  private handleObservable(): void {
    switch(this.type) {
      case 'all': {
        this.fruits$ = this.fruitService.all();
        break;
      }
      case 'nutrition': {
        let params = this.paramsService.getNutritionParams();
        this.fruits$ = this.fruitService.nutrition(params.nutritions, params.min, params.max);
        break;
      }
      case 'family': {
        let params = this.paramsService.getFruitSearch();
        if(params === '') {
          this.fruits$ = this.fruitService.all();
        } else {
          this.fruits$ = this.fruitService.family(params);
        }
        break;
      }
      case 'order': {
        let params = this.paramsService.getFruitSearch();
        if(params === '') {
          this.fruits$ = this.fruitService.all();
        } else {
          this.fruits$ = this.fruitService.order(params);
        }
        break;
      }
      case 'genus': {
        let params = this.paramsService.getFruitSearch();
        if(params === '') {
          this.fruits$ = this.fruitService.all();
        } else {
          this.fruits$ = this.fruitService.genus(params);
        }
        break;
      }
    }
  }
}
