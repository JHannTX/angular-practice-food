import { Component } from '@angular/core';
import { CocktailsService } from './services/cocktails.service';
import { FruitsService } from './services/fruits.service';

@Component({
  selector: 'fd-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'food';

  constructor(private cocktailsService: CocktailsService, private fruitsService: FruitsService) {}

  ngOnInit() {
    this.cocktailsService.search('name', 'margarita')
      .subscribe(response => {
        console.log(response);
      });

      this.fruitsService.all()
      .subscribe((response) => {
        console.log(response);
      });
  }
}
