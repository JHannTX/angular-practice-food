import { Component } from '@angular/core';
import { FruitsService } from 'src/app/services/fruits.service';

@Component({
  selector: 'fd-fruit-home',
  templateUrl: './fruit-home.component.html',
  styleUrls: ['./fruit-home.component.css']
})
export class FruitHomeComponent {

  constructor(private fruitsService: FruitsService) {}

  ngOnInit() {
    this.fruitsService.all()
      .subscribe((response) => {
        console.log(response);
      });
  }
}
