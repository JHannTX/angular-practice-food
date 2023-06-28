import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
    this.fruits$ = this.fruitService.all();

    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        this.needSearch = false;
        this.needSelector = false;
        this.type = paramMap.get('type')!;
        if(this.type?.toLowerCase() === 'nutrition') {
          this.needSelector = true;
        } else if(this.type?.toLowerCase() !== 'all') {
          this.needSearch = true;
        }
      });

    this.activatedRoute.queryParamMap
      .subscribe((queryMap) => {
        if(this.type.toLowerCase() === 'nutrition') {
          if(!this.nutritionEquality(queryMap.get('nutrition'), queryMap.get('min'), queryMap.get('max'))) {
            let nutritionParams = this.paramsService.getNutritionParams();
            nutritionParams = this.paramsService.setNutritionParams({
              nutritions: queryMap.get('nutrition') ?? nutritionParams.nutritions,
              min: queryMap.get('min') ?? nutritionParams.min,
              max: queryMap.get('max') ?? nutritionParams.max
            });

            this.fruits$ = this.fruitService.nutrition(nutritionParams.nutritions, nutritionParams.min, nutritionParams.max);
          }
        }
      });
  }

  onNutritionSubmission(nutrition: NutritionSubmit) {
    this.paramsService.setNutritionParams(nutrition);
    this.fruits$ = this.fruitService.nutrition(nutrition.nutritions, nutrition.min, nutrition.max);
  }

  private nutritionEquality(nutrition: string | null, min: string | null, max: string | null): boolean {
    const nutritonParams = this.paramsService.getNutritionParams();
    return (nutritonParams.nutritions === nutrition) && 
      (nutritonParams.min === min) && 
      (nutritonParams.max === max);
  }
}
