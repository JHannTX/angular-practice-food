import { Component, Input } from '@angular/core';
import { NutritionSubmit, ParamsService } from 'src/app/services/utility/params.service';

@Component({
  selector: 'fd-fruit-navigator',
  templateUrl: './fruit-navigator.component.html',
  styleUrls: ['./fruit-navigator.component.css']
})
export class FruitNavigatorComponent {
  @Input() isComingFromHome: boolean = false;
  @Input() isComingFromDetails: boolean = false;

  prefix: string = '..';

  constructor(private paramsService: ParamsService) {}

  ngOnInit() {
    if(this.isComingFromHome) {
      this.prefix = '../fruit';
    } else if(this.isComingFromDetails) {
      this.prefix = '../..'
    }
  }

  getNutritionParams(): NutritionSubmit {
    return this.paramsService.getNutritionParams();
  }

  getSearchParams(): SearchParam {
    let searchParam: SearchParam = {
      term: this.paramsService.getFruitSearch()
    }

    return searchParam;
  }
}

interface SearchParam {
  term: string
}
