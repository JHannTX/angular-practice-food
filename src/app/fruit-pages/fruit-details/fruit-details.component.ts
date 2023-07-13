import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Fruit, FruitsService } from 'src/app/services/fruits.service';

@Component({
  selector: 'fd-fruit-details',
  templateUrl: './fruit-details.component.html',
  styleUrls: ['./fruit-details.component.css']
})
export class FruitDetailsComponent {
  emittedFruit$!: Observable<Fruit>;
  fruitItem!: Fruit;

  constructor(private fruitService: FruitsService) {}

  ngOnInit() {
    this.emittedFruit$ = this.fruitService.getFruit();

    this.emittedFruit$.subscribe((item) => {
      this.fruitItem = item;
    })
  }
}
