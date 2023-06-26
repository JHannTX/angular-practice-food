import { Component, Input } from '@angular/core';
import { Fruit, FruitsService } from 'src/app/services/fruits.service';

@Component({
  selector: 'fd-fruit-list-item',
  templateUrl: './fruit-list-item.component.html',
  styleUrls: ['./fruit-list-item.component.css']
})
export class FruitListItemComponent {
  @Input() fruit!: Fruit;

  constructor(private fruitService: FruitsService) {}

  onClick() {
    this.fruitService.sendFruit(this.fruit);
  }
}
