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
        } else if(map.has('nutrition')) {
          let nutritionParams = this.paramsService.getNutritionParams();
          nutritionParams = this.paramsService.setNutritionParams({
            nutritions: map.get('nutrition') ?? nutritionParams.nutritions,
            min: map.get('min') ?? nutritionParams.min,
            max: map.get('max') ?? nutritionParams.max
          });
        }

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
        }
      });
  }

  onNutritionSubmission(nutrition: NutritionSubmit) {
    this.paramsService.setNutritionParams(nutrition);
    this.fruits$ = this.fruitService.nutrition(nutrition.nutritions, nutrition.min, nutrition.max);
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

  private nutritionEquality(nutrition: string | null, min: string | null, max: string | null): boolean {
    const nutritonParams = this.paramsService.getNutritionParams();
    return (nutritonParams.nutritions === nutrition) && 
      (nutritonParams.min === min) && 
      (nutritonParams.max === max);
  }
}
