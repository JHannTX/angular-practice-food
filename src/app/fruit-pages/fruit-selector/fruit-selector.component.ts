import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FruitsService } from 'src/app/services/fruits.service';
import { NutritionSubmit } from '../utility/fruit-interfaces';

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
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.nutritions$ = this.fruitService.listNutritions();

    this.form = this.formBuilder.group({
      nutritions: this.formBuilder.control('calories'),
      min: this.formBuilder.control('0', {nonNullable: true}),
      max: this.formBuilder.control('1000', {nonNullable: true})
    });
  }

  onSubmit(nutrition: NutritionSubmit) {
    this.nutrition.emit(nutrition);
  }
}
