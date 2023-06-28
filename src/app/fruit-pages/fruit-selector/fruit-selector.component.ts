import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FruitsService } from 'src/app/services/fruits.service';
import { NutritionSubmit, ParamsService } from 'src/app/services/utility/params.service';

@Component({
  selector: 'fd-fruit-selector',
  templateUrl: './fruit-selector.component.html',
  styleUrls: ['./fruit-selector.component.css']
})
export class FruitSelectorComponent {
  @Output() nutrition = new EventEmitter();

  nutritions$!: Observable<string[]>;
  form!: FormGroup;

  constructor(private fruitService: FruitsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paramsService: ParamsService) {}

  ngOnInit() {
    this.nutritions$ = this.fruitService.listNutritions();

    let nutritionParams: NutritionSubmit = this.paramsService.getNutritionParams();

    this.form = this.formBuilder.group({
      nutritions: this.formBuilder.control(nutritionParams.nutritions),
      min: this.formBuilder.control(nutritionParams.min, {nonNullable: true}),
      max: this.formBuilder.control(nutritionParams.max, {nonNullable: true})
    });
  }

  onSubmit(nutrition: NutritionSubmit) {
    this.nutrition.emit(nutrition);

    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute, 
      queryParams: {
        nutrition: nutrition.nutritions, 
        min: nutrition.min, 
        max: nutrition.max
      }});
  }
}
